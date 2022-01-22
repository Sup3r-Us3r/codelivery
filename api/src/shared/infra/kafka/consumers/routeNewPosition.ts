import { AppError } from '../../../error/AppError';
import { consumer } from '../consumer';
import { io } from '../../websocket/socketio';

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

  io.on('connection', async socket => {
    const clients = io.sockets.sockets;

    if (!clients.get(socket.id)?.connected) {
      console.log('Client not exists, refresh application and resend a new direction again.');
      return;
    }

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (topic === 'route.new-position' && message.value) {
          try {
            const messageValue = JSON.parse(String(message.value)) as PositionResponse;

            io.emit('route.new-position', messageValue);

            console.log(messageValue);
          } catch {
            throw new AppError('Check the data that was received', 500);
          }
        }
      }
    });
  });
})()
  .then(() => console.log('CONSUMER route.new-position WORKING'))
  .catch((error) => console.log('CONSUMER route.new-position: ', error));
