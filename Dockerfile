# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory
WORKDIR /backend

# Copy the requirements file into the image
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code into the image
COPY . .

# Specify the command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
