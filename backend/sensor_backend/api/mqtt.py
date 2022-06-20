from asyncio.log import logger
import paho.mqtt.client as mqtt
from .models import SensorValue
broker = "localhost"  # port
port = 1883  # time to live
timelive = 60

subscription_topic = "flat/+/temperature"


def on_connect(client, userdata, flags, rc):
    print("Connected to mqtt broker with result code "+str(rc))
    client.subscribe(subscription_topic)


def on_message(client, userdata, msg):

    print(msg.payload.decode())

    json_data = msg.payload.decode()
    # p = SensorValue(sensor=json_data["sensor_id"],
    #               sensor = json_data["roo"])

    # p.save()


client = mqtt.Client()

try:
    client.connect(broker, port, timelive)
except ConnectionRefusedError:
    logger.error(
        "ConnectionRefusedError: Failed to connect to mqtt broker. Is the Broker running?")

client.on_connect = on_connect
client.on_message = on_message
