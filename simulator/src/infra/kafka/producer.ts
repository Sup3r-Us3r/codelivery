import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'simulator',
  brokers: ['host.docker.internal:9094'],
});

const producer = kafka.producer();

export { producer };
