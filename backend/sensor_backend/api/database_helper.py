from .models import Sensor, SensorValue, Room
import datetime


class DatabaseHelper:

    def add_reading(self, reading):
        self.format_reading(reading)

        # check if sensor exists
        # if not insert sensor to database

        return 0

    @staticmethod
    def format_reading(reading):
        return 0

    @staticmethod
    def add():
        obj = SensorValue()
        obj.sensor = reading["device"]
        obj.time = datetime.datetime.now()
        obj.temperature = reading["temperature"]
        obj.humidity = reading["DATE"]
        obj.save()
