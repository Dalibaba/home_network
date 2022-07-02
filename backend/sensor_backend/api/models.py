from pyexpat import model
from django.db import models
from django.forms import CharField

# Create your models here.


class Sensor(models.Model):
    device = models.CharField(max_length=30)
    sensor_id = models.CharField(max_length=15, unique=True)
    type = models.CharField(max_length=30)
    room = models.CharField(max_length=30)


class Temperature(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    value = models.FloatField()


class Humidity(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    value = models.FloatField()
