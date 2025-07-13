FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/download/OllamaLinux.zip -o ollama.zip \
    && unzip ollama.zip -d /ollama \
    && chmod +x /ollama/ollama

# Expose Ollama API port
EXPOSE 11434

# Run Ollama server
CMD ["/ollama/ollama", "serve"]