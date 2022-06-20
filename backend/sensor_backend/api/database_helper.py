from asyncore import read
from enum import Enum
from .models import Sensor, Temperature, Humidity, Room
import datetime
import json


class DatabaseHelper:

    def add_reading(self, reading, topic):
        reading = self.add_time(reading)
        topic = topic.split("/")[2]

        if not Sensor.objects.filter(sensor_id=reading['sensor_id']).exists():
            sensor = Sensor(
                device=reading["device"], sensor_id=reading['sensor_id'])
            sensor.save()

        sensor = Sensor.objects.filter(sensor_id=reading['sensor_id'])[0]

        if not Room.objects.filter(name=reading['room']).exists():
            room = Room(
                name=reading["room"], sensor=sensor)
            room.save()

        self.add(reading, sensor, topic)

    @staticmethod
    def add_time(reading):
        reading = json.loads(reading)
        reading["time"] = datetime.datetime.now()
        return reading

    def add(self, reading, sensor, topic):
        obj = self.get_value_table(topic)
        obj.sensor = sensor
        obj.time = reading["time"]
        obj.value = reading["value"]
        obj.save()

    @staticmethod
    def get_value_table(topic):
        if topic == DatabaseHelper.ValueTypes.TEMPERATURE:
            return Temperature()
        if topic == DatabaseHelper.ValueTypes.HUMIDITY:
            return Humidity()

    class ValueTypes(str, Enum):
        TEMPERATURE = "temperature"
        HUMIDITY = "humidity"  # Meter Serial Number
