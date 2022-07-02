from asyncore import read
from enum import Enum
from .models import Sensor, Temperature, Humidity
import datetime
import json
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class DatabaseHelper:

    def add_reading(self, reading, topic):
        topic = topic.split("/")[2]
        reading = self.add_metadata(reading, topic)

        if not Sensor.objects.filter(sensor_id=reading['sensor_id']).exists():
            sensor = Sensor(
                device=reading["device"], sensor_id=reading['sensor_id'], type=reading["type"], room=reading["room"])
            sensor.save()

        sensor = Sensor.objects.filter(sensor_id=reading['sensor_id'])[0]

        self.add(reading, sensor, topic)

    @staticmethod
    def add_metadata(reading, topic):
        reading = json.loads(reading)
        reading["time"] = datetime.datetime.now()
        reading["type"] = topic
        return reading

    def add(self, reading, sensor, topic):
        obj = self.get_value_table(topic)
        obj.sensor = sensor
        obj.date_time = reading["time"]
        obj.value = reading["value"]
        obj.save()
        logger.debug("value saved")

    @staticmethod
    def get_value_table(topic):
        if topic == DatabaseHelper.ValueTypes.TEMPERATURE:

            return Temperature()
        if topic == DatabaseHelper.ValueTypes.HUMIDITY:
            return Humidity()

    class ValueTypes(str, Enum):
        TEMPERATURE = "temperature"
        HUMIDITY = "humidity"  # Meter Serial Number
