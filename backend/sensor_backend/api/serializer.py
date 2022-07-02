from dataclasses import field
from rest_framework import serializers

from .models import Sensor, Temperature, Humidity


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ('id', 'device', 'sensor_id', 'room', 'type')


class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperature
        fields = ('id', 'sensor', 'date_time', 'value')


class HumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Humidity
        fields = ('id', 'sensor', 'date_time', 'value')
