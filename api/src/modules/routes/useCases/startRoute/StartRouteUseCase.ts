import { AppError } from '../../../../shared/error/AppError';
import { producer } from '../../../../shared/infra/kafka/producer';

type Request = {
  routeId: string;
  clientId: string;
}

export class StartRouteUseCase {
  async execute({ routeId, clientId }: Request) {
    try {
      await producer.connect();
      await producer.send({
        topic: 'route.new-direction',
        messages: [
          {
            key: 'route.new-direction',
            value: JSON.stringify({
              routeId,
              clientId,
            }),
          }
        ],
      });
      await producer.disconnect();
    } catch {
      throw new AppError('Error sending a new direction', 500);
    }
  }
}
