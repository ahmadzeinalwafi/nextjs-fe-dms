# MQTT Approach

## Python

This is example code for requesting workers to save records data. [NOT VERIFIED]

```
import json
import paho.mqtt.client as mqtt

# Device configuration
device_config = {
    "device_id": "your_device_id_here",  # Replace with your device ID
    "fields": {
        "temperature": 45.22,
        "humidity": 90
    }
}

# MQTT settings
broker = "mqtt.eclipse.org"  # You can change this to your broker address
port = 1883  # Default MQTT port
topic = "devices/data"  # Topic to publish

# Callback when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Convert the device_config dictionary to a JSON string
    payload = json.dumps(device_config)
    # Publish the message to the specified topic
    client.publish(topic, payload)
    print(f"Message sent: {payload}")
    # Disconnect after sending the message
    client.disconnect()

# Create an MQTT client
client = mqtt.Client()

# Set the connect callback function
client.on_connect = on_connect

# Connect to the MQTT broker
client.connect(broker, port, 60)

# Loop forever to maintain connection and handle messages
client.loop_forever()
```

## Go
This is example code for requesting workers to save records data.

This is the entity record data
```
type HistoricalDeviceRecords struct {
	Device_Id string
	Fields   map[string]interface{}
}
```
This is the code to send data
```
import (
	"encoding/json"
	"log"

	entity "dms/internal/domain/entities"

	mqtt "dms/internal/infrastructure/messaging/paho"
)

func main() {
	// MQTT broker details
	topic := "devices/data"
	mqttConnection, err := mqtt.NewMQTTConnection("<mqtt url>")
	if err != nil {
		panic(err)
	}

	// Prepare data to publish
	record := entity.HistoricalDeviceRecords{
		Device_Id: "10VL6mnHo",
		Fields: map[string]interface{}{
			"temperature": 123.123,
			"humidity":    80.123,
		},
	}

	// Marshal the data into JSON
	payload, err := json.Marshal(record)
	if err != nil {
		log.Fatalf("Failed to marshal data: %v", err)
	}

	// Publish the data to the topic
	if token := mqttConnection.Client.Publish(topic, 0, false, payload); 
    token.Wait() && token.Error() != nil {
		log.Fatalf("Failed to publish message: %v", token.Error())
	} else {
		log.Printf("Message published successfully to topic: %s", topic)
	}

	// Disconnect after publishing
	mqttConnection.Client.Disconnect(250)
}
```
## Arduino
[SOON]
