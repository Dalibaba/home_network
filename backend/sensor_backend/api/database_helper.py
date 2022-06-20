from .models import Sensor, SensorValue, Room
import datetime


class DatabaseHelper:

    @staticmethod
    def add_to_database(reading):
        obj = SensorValue()
        obj.sensor = reading["device"]
        obj.time = datetime.datetime.now()
        obj.temperature = reading["temperature"]
        obj.humidity = reading["DATE"]
        obj.save()
