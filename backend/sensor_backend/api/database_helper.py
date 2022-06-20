from asyncore import read
from .models import Sensor, SensorValue, Room
import datetime
import json


class DatabaseHelper:

    def add_reading(self, reading):
        reading = self.add_time(reading)

        if Sensor.objects.filter(sensor_id=reading['sensor_id']).exists():
            sensor = Sensor.objects.filter(sensor_id=reading['sensor_id'])
            self.add(reading, sensor[0])
        else:
            sensor = Sensor(
                device=reading["device"], sensor_id=reading['sensor_id'])
            sensor.save()
            self.add(reading, sensor)

        return 0

    @staticmethod
    def add_time(reading):
        reading = json.loads(reading)
        reading["time"] = datetime.datetime.now()

        return reading

    @staticmethod
    def add(reading, sensor):
        obj = SensorValue()
        obj.sensor = sensor
        obj.time = reading["time"]
        obj.temperature = reading["temperature"]

        obj.save()
