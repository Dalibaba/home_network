#include <ESP8266WiFi.h>


const char* SSID = "Milky_Way";
const char* PSK = "ThisIstheway2022!?";

void setup()
{
    Serial.begin(115200);
    Serial.println();

    WiFi.begin(SSID, PSK);

    Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println();

    Serial.print("Connected, IP address: ");
    Serial.println(WiFi.localIP());
}

void loop() {
  Serial.println("Connected to wifi . . .");
  delay(2000);
  }
