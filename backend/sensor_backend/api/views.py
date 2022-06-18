from django.shortcuts import render
from rest_framework import generics
from .models import Sensor
from .serializer import SensorSerializer
# Create your views here.


class SensorView(generics.ListAPIView):
    queryset = Sensor.objects.all()  # return all Sensors
    serializer_class = SensorSerializer
