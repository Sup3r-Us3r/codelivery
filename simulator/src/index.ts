import { consumer } from './infra/kafka/consumer';
import { producePosition } from './app/kafka/produce';
import { RouteInputData } from './app/route';

// Auto-invoked main function, to start consuming message from topic route.new-direction
(async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'route.new-direction' });

    console.log('Kafka connected on route.new-direction topic');

    const tasks: Promise<void>[] = [];

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (topic === 'route.new-direction' && message.value) {
          try {
            const messageValue = JSON.parse(String(message.value)) as RouteInputData;

            tasks.push(producePosition(messageValue));
          } catch {
            console.log('Check the data that was sent');
          }
        }
      }
    });

    await Promise.all(tasks);
  } catch (error) {
    console.log('KAFKA CONSUMER ERROR: ', error);
  }
})();
