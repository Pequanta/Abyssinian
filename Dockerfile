
FROM python:3.12-slim


WORKDIR /


COPY backend/requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt


COPY backend/ .

CMD ["gunicorn","-c","gunicorn.config.py", "main:app"]
