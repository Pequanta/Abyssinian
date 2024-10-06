
FROM python:3.9-slim

WORKDIR /app

COPY ./backend /app

COPY ./backend/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["gunicorn", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8080", "--worker-tmp-dir", "/dev/shm", "app:app"]
