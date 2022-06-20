from django.shortcuts import render
from rest_framework import generics
from .models import Sensor, Temperature, Humidity
from .serializer import SensorSerializer, TemperatureSerializer, HumiditySerializer
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.


class SensorView(generics.ListAPIView):
    queryset = Sensor.objects.all()  # return all Sensors
    serializer_class = SensorSerializer


class Sensorview(generics.ListAPIView):

    def __init__(self, model, serializer):
        self.model = model
        self.serializer_class = serializer

    def get_queryset(self):
        if self.request.method == 'GET':
            queryset = self.model.objects.all()
            sensor_id = self.request.GET.get('id', None)
            latest = self.request.GET.get('latest', None)
            if sensor_id is not None:
                queryset = queryset.filter(sensor=sensor_id)
                if latest is not None:
                    queryset = queryset.filter(
                        sensor=sensor_id).order_by("-date_time")[:1]  # descending
            return queryset


class TemperatureView(Sensorview):

    def __init__(self):
        super().__init__(Temperature, TemperatureSerializer)


class HumidityView(Sensorview):
    def __init__(self):
        super().__init__(Humidity, HumiditySerializer)
