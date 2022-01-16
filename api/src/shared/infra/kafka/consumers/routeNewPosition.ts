import { AppError } from '../../../error/AppError';
import { consumer } from '../consumer';

export type PositionResponse = {
  routeId: string;
  clientId: string;
  position: {
    latitude: number;
    longitude: number;
  };
  finished: boolean;
}

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'route.new-position' });
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (topic === 'route.new-position' && message.value) {
        try {
          const messageValue = JSON.parse(String(message.value)) as PositionResponse;

          console.log(messageValue);
        } catch {
          throw new AppError('Check the data that was received', 500);
        }
      }
    }
  });
})()
  .then(() => console.log('CONSUMER route.new-position WORKING'))
  .catch((error) => console.log('CONSUMER route.new-position: ', error));
