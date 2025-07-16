# Budget Tracker RAG App

**App Link:** [Check out the App Here](https://budget-tracker-virid-psi.vercel.app/)

---

## About the Project

The **Budget Tracker RAG (Retrieval-Augmented Generation) Application** is a modern AI-powered financial assistant that allows users to analyze their personal or business budget data through conversational queries.

Users upload CSV files containing their budget data, and the application intelligently converts this data into a **MySQL database table**. When the user submits a financial question, the app:
1. Sends the query to a **cloud-hosted LLM (via Ollama API)**
2. The LLM translates the natural language query into an appropriate **SQL query**
3. The SQL query is executed against the MySQL database
4. The retrieved result is then sent back to the **LLM to rephrase it into a natural language response**
5. The final human-readable answer is returned to the user via the frontend

---

## Features

- Upload CSV budget files  
- Automated conversion of CSV data into a **MySQL database table**  
- Ask natural language financial questions  
- Query translation and response generation via a **cloud-hosted LLM**  
- Modern frontend built with **Next.js**
- RAG architecture: retrieval + generation pipeline

---

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend API:** FastAPI
- **Database:** MySQL
- **LLM Engine:** Cloud-hosted LLM (accessed via API)
- **Data Processing:** Pandas
- **RAG Workflow:** SQL generation, result retrieval, LLM-based response crafting  

---

