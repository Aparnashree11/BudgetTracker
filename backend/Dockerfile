# Use Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install Ollama (adjust if needed)
RUN curl -fsSL https://ollama.com/install.sh | bash

# Copy your app code
COPY . .

# Expose the port your API runs on
EXPOSE 8000

# Run your app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]