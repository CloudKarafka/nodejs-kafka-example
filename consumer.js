var Kafka = require("node-rdkafka");

var kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD
};

const prefix = process.env.CLOUDKARAFKA_USERNAME;
const topics = [`${prefix}.test`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});
const numMessages = 5;
let counter = 0;
consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});
consumer.on("data", function(m) {
  counter++;
  if (counter % numMessages === 0) {
    console.log("calling commit");
    consumer.commit(m);
  }
  console.log(m.value.toString());
});
consumer.on("disconnected", function(arg) {
  process.exit();
});

consumer.connect();

setTimeout(function() {
  consumer.disconnect();
}, 300000);
