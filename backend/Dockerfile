FROM python

WORKDIR /app

COPY requirements.txt . 

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "sensor_backend/manage.py", "runserver", "0.0.0.0:8000"]
