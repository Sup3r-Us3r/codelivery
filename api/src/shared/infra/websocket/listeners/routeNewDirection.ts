import { io } from '../socketio';
import { producer } from '../../kafka/producer';
import { AppError } from '../../../error/AppError';

type RouteNewDirectionPayload = {
  routeId: string;
  clientId: string;
}

(async () => {
  io.on('connection', socket => {
    socket.on('route.new-direction', async (data: RouteNewDirectionPayload) => {
      try {
        await producer.connect();
        await producer.send({
          topic: 'route.new-direction',
          messages: [
            {
              key: 'route.new-direction',
              value: JSON.stringify({
                routeId: data.routeId,
                clientId: data.clientId,
              }),
            }
          ],
        });
        await producer.disconnect();
      } catch {
        throw new AppError('Error sending a new direction', 500);
      }
    });
  });
})()
  .then(() => console.log('WEBSOCKET LISTENER route.new-direction WORKING'))
  .catch((error) => console.log('WEBSOCKET LISTENER route.new-direction: ', error));
