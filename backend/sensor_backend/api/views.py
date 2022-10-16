from django.shortcuts import render
from rest_framework import generics
from .models import Sensor, Temperature, Humidity
from .serializer import SensorSerializer, TemperatureSerializer, HumiditySerializer

# Create your views here.
import logging
logger = logging.getLogger(__name__)


class DataView(generics.ListAPIView):

    def __init__(self, model, serializer):
        self.model = model
        self.serializer_class = serializer

    def get_queryset(self):
        if self.request.method == 'GET':

            try:
                queryset = self.model.objects.all()
                sensor_id = self.request.GET.get('id', None)
                latest = self.request.GET.get('latest', None)
                if sensor_id is not None:
                    queryset = queryset.filter(sensor=sensor_id)
                    if latest is not None:
                        queryset = queryset.filter(
                            sensor=sensor_id).order_by("-date_time")[:1]  # descending
                return queryset
            except Exception as e:
                logger.error("query was unsuccesful. So Sensor Data available")
                print(e)


class TemperatureView(DataView):
    def __init__(self):
        super().__init__(Temperature, TemperatureSerializer)


class HumidityView(DataView):
    def __init__(self):
        super().__init__(Humidity, HumiditySerializer)


class SensorView(DataView):
    def __init__(self):
        super().__init__(Sensor, SensorSerializer)

    def get_queryset(self):
        try:
            queryset = self.model.objects.all()  # return all Sensors
            return queryset
        except Exception as e:
            logger.error("query was unsuccessful")
            print(e)
