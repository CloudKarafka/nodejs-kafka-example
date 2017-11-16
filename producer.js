const Kafka = require("node-rdkafka");

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD
};

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topic = `${prefix}.test`;
const producer = new Kafka.Producer(kafkaConf);
const maxMessages = 20;

const genMessage = i => new Buffer(`Kafka example, message number ${i}`);

producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`);
  for (var i = 0; i < maxMessages; i++) {
    producer.produce(topic, -1, genMessage(i), i);
  }
  setTimeout(() => producer.disconnect(), 0);
});

producer.on("disconnected", function(arg) {
  process.exit();
});
producer.connect();
