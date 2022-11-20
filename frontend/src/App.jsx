import { useEffect, useState } from 'react'
import { ChartLine } from './components/ChartLine'
import { Client } from "paho-mqtt"
var client

function App() {

  const [numberMQTT, setNumberMQTT] = useState(0)

  function connect() {
    client = new Client("broker.mqttdashboard.com", 8000, "clientId-qwetabnt");

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
      // IMPORTANTE
      console.log("onMessageArrived: " + message.payloadString);
      setNumberMQTT(message.payloadString)
    }
  }

  useEffect(() => {
    //connect()
  }, [])

  return (
    <div className="App">
      <header>
        {numberMQTT}
      </header>
      <main>
        <div className="card-full">
          <ChartLine state={numberMQTT} colorLine=" #8592c7" labelX="Eixo x" labelY="Eixo Y"/>
        </div>
        <div className="card-flex-container">
          <div className="card-flex">
          <ChartLine state={numberMQTT} colorLine=" #85c7a6" labelX="Eixo x" labelY="Eixo Y"/>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
