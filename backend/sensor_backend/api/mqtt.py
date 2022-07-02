# import the logging library
import json
import time
from .database_helper import DatabaseHelper
import paho.mqtt.client as mqtt
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


broker = "mosquitto"  # port s
port = 1883  # time to live
timelive = 60

temperature_topic = "flat/+/temperature"
humidity_topic = "flat/+/humidity"
database_helper = DatabaseHelper()


def on_connect(client, userdata, flags, rc):

    if rc == 0:
        logger.debug("connected OK Returned code=" + str(rc))
        client.subscribe(temperature_topic)
        client.subscribe(humidity_topic)
    else:
        logger.debug("Bad connection Returned code=" + str(rc))
        time.sleep(3)
        connect(client)


def on_message(client, userdata, msg):
    database_helper.add_reading(msg.payload.decode(), msg.topic)


def connect(client):
    try:
        rc = client.connect(broker, port, timelive)
        print("rc:", rc)
    except ConnectionRefusedError:
        logger.error(
            "ConnectionRefusedError: Failed to connect to mqtt broker %s %s Is the Broker running?", broker, port)
        time.sleep(3)
        logger.debug(ConnectionRefusedError)
        logger.debug("Try to connect again . . . ")
        connect(client)
    except Exception:
        logger.error(
            "Cannot connect to mqtt broker  %s %s:", broker, port)


client = mqtt.Client()
connect(client)

client.on_connect = on_connect
client.on_message = on_message
