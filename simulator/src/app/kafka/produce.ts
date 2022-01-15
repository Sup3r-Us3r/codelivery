import { producer } from '../../infra/kafka/producer';
import {
  exportJsonPositions,
  loadRoutePositionsFromFile,
  RouteInputData,
} from '../route';

/**
 * producePosition is responsible to publish the positions of each request
 * Example of a json request:
 * 
 * {"routeId": "1", "clientId": "1"}
 * {"routeId": "2", "clientId": "2"}
 * {"routeId": "3", "clientId": "3"}
 */
async function producePosition(route: RouteInputData) {
  await producer.connect();

  const positions = await loadRoutePositionsFromFile(route.routeId);
  const routeData = exportJsonPositions(route, positions);

  for (let i = 0; i < positions.length; i++) {
    await producer.send({
      topic: 'route.new-position',
      messages: [{
        value: JSON.stringify(routeData[i]),
      }],
    });

    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(true), 500)
    );
  }
}

export { producePosition };
