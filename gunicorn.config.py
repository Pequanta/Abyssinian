import multiprocessing

# Define the address to bind
bind = "0.0.0.0:8080"

# Number of worker processes.
workers = multiprocessing.cpu_count() * 2 + 1
s
worker_class = "uvicorn.workers.UvicornWorker"

#log file and error log file
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"

# Log level
loglevel = "info"

# Timeout for workers
timeout = 30

