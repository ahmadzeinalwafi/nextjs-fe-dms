# HTTP Approach

## Python
This is the test code for requesting to server
```
def test_create_records_device():
    """Test the POST /devices/:device_id/records endpoint."""
    global device_id

    device_config = {
        "fields": {
                "temperature": 45.22,
                "humidity": 90
        }
    }

    response = requests.post(
        f"http://<url>/devices/{device_id}/records", 
        json=device_config)
    assert response.status_code == 200

    response = response.json()["data"]
    assert response["Device_Id"] == device_id
    assert isinstance(response["Fields"], dict)
```
## Go
This is test code for requesting to server [NOT VERIFIED]

```
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"testing"
)

var deviceID = "your_device_id_here" // Set your device_id

func testCreateRecordsDevice(t *testing.T) {
	// Device configuration
	deviceConfig := map[string]interface{}{
		"fields": map[string]interface{}{
			"temperature": 45.22,
			"humidity":    90,
		},
	}

	// Marshalling deviceConfig into JSON
	deviceConfigJSON, err := json.Marshal(deviceConfig)
	if err != nil {
		t.Fatalf("Error marshalling deviceConfig: %v", err)
	}

	// Send POST request
	url := fmt.Sprintf("http://<url>/devices/%s/records", deviceID)
	resp, err := http.Post(url, 
        "application/json", 
        bytes.NewBuffer(deviceConfigJSON))
	if err != nil {
		t.Fatalf("Error sending POST request: %v", err)
	}
	defer resp.Body.Close()

	// Ensure the status code is 200
	if resp.StatusCode != 200 {
		t.Fatalf("Expected status code 200, got %d", resp.StatusCode)
	}

	// Parse the JSON response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Error reading response body: %v", err)
	}

	var responseData map[string]interface{}
	err = json.Unmarshal(body, &responseData)
	if err != nil {
		t.Fatalf("Error unmarshalling response: %v", err)
	}

	// Check if the response contains the expected fields
	data, ok := responseData["data"].(map[string]interface{})
	if !ok {
		t.Fatalf("Expected 'data' to be a map, got %v", responseData["data"])
	}

	if data["Device_Id"] != deviceID {
		t.Fatalf("Expected Device_Id to be %s, got %v", deviceID, data["Device_Id"])
	}

	fields, ok := data["Fields"].(map[string]interface{})
	if !ok {
		t.Fatalf("Expected Fields to be a map, got %v", data["Fields"])
	}

	// You can add more assertions on Fields here if needed

	t.Log("Test passed successfully")
}

func main() {
	// Run the test
	t := &testing.T{}
	testCreateRecordsDevice(t)
}

```

## Arduino
[SOON]