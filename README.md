# Apache Kafka Producer/Consumer example for (Node.js)

## Getting started

Setup your free Apache Kafka instance here: https://www.cloudkarafka.com

Configuration

* `export CLOUDKARAFKA_BROKERS="host1:9094,host2:9094,host3:9094"`
  Hostnames can be found in the Details view in for your CloudKarafka instance.
* `export CLOUDKARAFKA_USERNAME="username"`
  Username can be found in the Details view in for your CloudKarafka instance.
* `export CLOUDKARAFKA_PASSWORD="password"`
  Password can be found in the Details view in for your CloudKarafka instance.
* `export CLOUDKARAFKA_TOPIC_PREFIX="<username>-"`
  Topic prefix should be the same as your username.

These export commands must be run in both of the terminal windows below.

```
git clone https://github.com/CloudKarafka/nodejs-kafka-example.git
cd nodejs-kafka-example
npm install
node consumer.js
```

Open another terminal window
```
# setup ENV variables for the new terminal window (from above)
cd nodejs-kafka-example
node consumer.js
```
