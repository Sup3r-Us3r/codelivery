import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [String(process.env.KAFKA_BROKER)],
});

const producer = kafka.producer();

export { producer };
