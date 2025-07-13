from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import pandas as pd
import mysql.connector
from mysql.connector import Error
import ollama
import os
import io
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility to connect to DB
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv('MYSQL_HOST'),
        user=os.getenv('MYSQL_USER'),
        password=os.getenv('MYSQL_PASSWORD'),
        database=os.getenv('MYSQL_DB')
    )

# Clean SQL response markdown
def clean_sql_response(content):
    if content.startswith("```sql"):
        content = content.replace("```sql", "").strip()
    if content.endswith("```"):
        content = content.replace("```", "").strip()
    return content

# Ask LLM
def ask_llm(prompt, model=os.getenv('OLLAMA_MODEL')):
    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    return response['message']['content'].strip()

# API: Upload CSV and create DB table
@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...), table_name: str = Form(...)):
    try:
        content = await file.read()
        df = pd.read_csv(io.BytesIO(content))

        conn = get_db_connection()
        cursor = conn.cursor()

       # Create database if not exists
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {table_name}")
        cursor.execute(f"USE {table_name}")

        # Drop table if exists
        cursor.execute(f"DROP TABLE IF EXISTS {table_name}")

        # Build CREATE TABLE statement
        columns = ', '.join([f"`{col}` TEXT" for col in df.columns])
        cursor.execute(f"CREATE TABLE {table_name} ({columns})")

        # Insert data
        for _, row in df.iterrows():
            values = "', '".join(str(v).replace("'", "''") for v in row.values)
            cursor.execute(f"INSERT INTO {table_name} VALUES ('{values}')")

        conn.commit()
        cursor.close()
        conn.close()

        return {"message": f"Table '{table_name}' created and data inserted successfully."}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# API: Ask a question
@app.post("/ask")
async def ask_question(question: str = Form(...), table_name: str = Form(...)):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            # Get column names
            cursor.execute(f"DESCRIBE `{table_name}`;")
            columns = [col[0] for col in cursor.fetchall()]
            column_list = ", ".join(columns)

            # LLM generates SQL
            sql_prompt = f"""
            You are an expert SQL assistant. Convert this natural language question into a valid MySQL query for table `{table_name}`.
            Available columns: {column_list}
            Question: "{question}"
            Only output the raw SQL query, no explanations.
            """
            sql_query = clean_sql_response(ask_llm(sql_prompt))
            print(f"Generated SQL:\n{sql_query}")

            cursor.execute(sql_query)
            result = cursor.fetchall()
            if not result:
                final_answer = "No results found."
            else:
                # Turn result into a natural language sentence
                result_str = str(result)
                answer_prompt = f"""
                The user asked: "{question}"
                The result from the SQL query is: {result_str}
                Write a clear, friendly English sentence answering the user's question based on the result.
                """
                final_answer = ask_llm(answer_prompt)
        except Error as e:
            print(f" SQL Error: {e}")
            # Fix query using LLM
            fix_prompt = f"""
            The following SQL query caused this error: {e}
            Original query: {sql_query}
            Available columns: {column_list}
            Please correct the query and output only the fixed SQL query.
            """
            fixed_query = ask_llm(fix_prompt)
            print(f"\n Fixed SQL:\n{fixed_query}")
            try:
                cursor.execute(fixed_query)
                result = cursor.fetchall()
                if not result:
                    final_answer = "No results found after fixing."
                else:
                    result_str = str(result)
                    answer_prompt = f"""
                    The user asked: "{question}"
                    The result from the SQL query is: {result_str}
                    Write a clear, friendly English sentence answering the user's question based on the result.
                    """
                    final_answer = ask_llm(answer_prompt)
            except Error as e2:
                final_answer = f"Failed to fix query: {e2}"
        finally:
            cursor.close()
            conn.close()

        return {"answer": final_answer, "sql_query": sql_query}

    except Error as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

