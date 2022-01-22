import fs from 'fs';
import { resolve as pathResolve } from 'path';
import readline from 'readline';

type Position = {
  latitude: number;
  longitude: number;
}

export type RouteInputData = {
  routeId: string;
  clientId: string;
}

type RouteResponseData = RouteInputData & {
  position: Position;
  finished: boolean;
}

// loadRoutePositionsFromFile loads from a .txt file all positions (lat and long) and returns them
function loadRoutePositionsFromFile(routeId: string): Promise<Position[]> {
  return new Promise<Position[]>((resolve, reject) => {
    const positionPath = pathResolve(
      __dirname,
      '..',
      '..',
      '..',
      'destinations',
      `${routeId}.txt`,
    );

    if (!positionPath) {
      reject('Invalid route id');
    }

    const readlineInterface = readline.createInterface({
      input: fs.createReadStream(positionPath),
    });

    const positions: Position[] = [];

    readlineInterface.on('line', (currentLine: string) => {
      const [latitude, longitude] = currentLine.split(',');

      positions.push({
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
    });

    readlineInterface.on('close', () => {
      resolve(positions);
    });
  });
}

// exportJsonPositions generates an object list with the RouteResponseData structure
function exportJsonPositions(
  route: RouteInputData,
  positions: Position[],
): RouteResponseData[] {
  const routeData: RouteResponseData[] = positions
    .map((position: Position, index) => ({
      routeId: route.routeId,
      clientId: route.clientId,
      position: {
        latitude: Number(position.latitude),
        longitude: Number(position.longitude),
      },
      finished: positions.length - 1 === index
    }));

  return routeData;
}

export { loadRoutePositionsFromFile, exportJsonPositions };
