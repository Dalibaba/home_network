#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

#define DHTPIN 13     // D 7 (look up in pinout reference png in docu)
#define DHTTYPE DHT11 //  DHT11 Sensor

DHT dht(DHTPIN, DHTTYPE); // Create Sensor as dht

const char *SSID = "";
const char *PSK = "";
const char *MQTT_BROKER = "192.168.0.120";
const char *TEMP_TOPIC = "flat/bath/temperature";
const char *HUMI_TOPIC = "flat/bath/humidity";
const char *SENSOR_ID = "t_1";
const char *ROOM = "bath";

WiFiClient espClient;
PubSubClient client(espClient);

void setup()
{
    Serial.begin(115200);
    setup_wifi();
    client.setServer(MQTT_BROKER, 1883);
    dht.begin();
}

void setup_wifi()
{
    delay(10);
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(SSID);

    WiFi.begin(SSID, PSK);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void reconnect()
{
    while (!client.connected())
    {
        Serial.print("Reconnecting...");
        if (!client.connect("ESP8266Client"))
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" retrying in 5 seconds");
            delay(5000);
        }
    }
}
void loop()
{

    delay(2000);
    if (!client.connected())
    {
        reconnect(); // try reconnecting with WiFi
    }
    client.loop();

    float humidity = dht.readHumidity(); // get humidty data

    float temperature = dht.readTemperature(); // get temperature data

    DynamicJsonDocument doc_temp(1024);
    doc_temp["device"] = "ESP32";
    doc_temp["sensor_id"] = SENSOR_ID;
    doc_temp["room"] = ROOM;
    doc_temp["temperature"] = temperature;
    char buffer_temp[256];

    DynamicJsonDocument doc_humi(1024);
    doc_humi["device"] = "ESP32";
    doc_humi["sensor_id"] = SENSOR_ID;
    doc_humi["room"] = ROOM;
    doc_humi["temperature"] = temperature;
    char buffer_humi[256];

    serializeJson(doc_temp, buffer_temp);
    serializeJson(doc_humi, buffer_humi);

    if (client.publish(TEMP_TOPIC, buffer_temp) == true)
    {
        Serial.println("\nSuccess sending message");
    }
    else
    {
        Serial.println("\nError sending message");
    }

    if (client.publish(HUMI_TOPIC, buffer_humi) == true)
    {
        Serial.println("\nSuccess sending message");
    }
    else
    {
        Serial.println("\nError sending message");
    }
}