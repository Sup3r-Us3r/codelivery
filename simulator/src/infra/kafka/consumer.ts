import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'simulator',
  brokers: ['host.docker.internal:9094'],
});

const consumer = kafka.consumer({
  groupId: 'simulator',
});

export { consumer };
