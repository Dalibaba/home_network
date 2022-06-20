from pyexpat import model
from django.db import models

# Create your models here.


class Sensor(models.Model):
    device = models.CharField(max_length=30)
    sensor_id = models.CharField(max_length=15, unique=True)


class Room(models.Model):
    name = models.CharField(max_length=30, unique=True)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)


class Temperature(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    time = models.DateField()
    value = models.FloatField()


class Humidity(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    time = models.DateField()
    value = models.FloatField()
