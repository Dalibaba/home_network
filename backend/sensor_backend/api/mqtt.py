# import the logging library
import time
from .database_helper import DatabaseHelper
import paho.mqtt.client as mqtt
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


broker = "localhost"  # port
port = 1883  # time to live
timelive = 60

subscription_topic = "flat/+/temperature"
database_helper = DatabaseHelper()


def on_connect(client, userdata, flags, rc):

    if rc == 0:
        logger.debug("connected OK Returned code=", rc)
        client.subscribe(subscription_topic)
    else:
        logger.debug("Bad connection Returned code=", rc)
        time.sleep(3)
        connect(client)


def on_message(client, userdata, msg):
    # cprint(msg.payload.decode())
    json_data = msg.payload.decode()
    database_helper.add_reading(json_data)


def connect(client):
    try:
        rc = client.connect(broker, port, timelive)
    except ConnectionRefusedError:
        logger.error(
            "ConnectionRefusedError: Failed to connect to mqtt broker. Is the Broker running?")
        time.sleep(3)
        logger.debug("Try to connect again . . . ")
        connect(client)


client = mqtt.Client()
connect(client)

client.on_connect = on_connect
client.on_message = on_message
