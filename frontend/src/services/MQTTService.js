import { Client } from "paho-mqtt"

export function connect() {
  var client

  client = new Client("broker.mqttdashboard.com", 8000, "ReviceRT");

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log("conectado")
    client.subscribe("mytopic/sendRT");
  }

  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
  }
}