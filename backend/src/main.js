import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import * as mqtt from 'mqtt'

// CONFIGURAÇÃO
const PORT = 8000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// INICIAR SERVIDOR HTTP

app.listen(PORT, function () {
    console.log("O servidor está funcioando")
})

// ROTAS HTTP

app.get("/",
    function (req, res) {
        // logica para pegar os dados
        res.status(200).send({ message: "Recebi algo pelo HTTP" })
    })


// MQTT

// CONFIG
const host = 'broker.mqttdashboard.com'
const port = '8000'
const connectUrl = `ws://${host}:${port}/mqtt`

const client = mqtt.connect(connectUrl, {
    clientId: 'clientId-zsefbf',
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
})

const topic = 'mytopic/sendRT'

// CONEXAO
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], (err) => {
        console.log(`Subscribe to topic '${topic}'`)
        if (!err) {
            setInterval(() => {
                // AQUI VEM OS DADOS QUE SERÃO ENVIADOS
                console.log("Enviando mensagem")
                client.publish(topic, Math.floor(Math.random() * 10).toString())
            }, 5000);
          }
    })
})
