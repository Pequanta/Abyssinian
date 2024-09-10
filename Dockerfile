
FROM python:3.12-slim


WORKDIR /backend


COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt


COPY . .

CMD ["gunicorn","-c","gunicorn.config.py", "main:app"]
