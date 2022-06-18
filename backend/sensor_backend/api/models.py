from pyexpat import model
from django.db import models

# Create your models here.


class Sensor(models.Model):
    name = models.CharField(max_length=30)
    room = models.CharField(max_length=30)


class SensorValue(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    date = models.DateField()
    temperature = models.FloatField()
    humidity = models.FloatField()
