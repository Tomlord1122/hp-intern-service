FROM ollama/ollama:latest

VOLUME /root/.ollama

EXPOSE 11434

CMD ["ollama", "serve"]

# docker exec -it ollama ollama pull llama3.1
