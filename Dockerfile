# Use an official Python 3.12 runtime as the base image
FROM python:3.12-slim

# Install Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Set the working directory for the application
WORKDIR /

# Copy backend dependencies and install them
COPY backend/requirements.txt backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the backend code
COPY backend/ backend/

# Copy the frontend code
COPY frontend/ frontend/

# Install Node.js dependencies and build the frontend
WORKDIR /frontend
RUN npm install
RUN npm run build

# Expose ports if needed (e.g., 8000 for backend, 5000 for frontend)
EXPOSE 8080
EXPOSE 5000

# Command to start the backend and frontend services
CMD ["sh", "-c", "cd /backend && gunicorn -c /gunicorn.config.py main:app & cd /frontend && npx serve -s build"]
