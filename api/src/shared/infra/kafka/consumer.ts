import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [String(process.env.KAFKA_BROKER)],
});

const consumer = kafka.consumer({
  groupId: String(process.env.KAFKA_CONSUMER_GROUP_ID),
});

export { consumer };
