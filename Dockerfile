FROM python:3.9-slim

# Set the working directory
WORKDIR /backend

# Copy the application code
COPY . /backend

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the desired port
EXPOSE 8080

# Command to run the app with Gunicorn using Uvicorn workers
CMD ["gunicorn", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080", "--worker-tmp-dir", "/dev/shm", "app:app"]
