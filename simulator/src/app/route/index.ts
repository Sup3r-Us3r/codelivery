import fs from 'fs';
import { resolve as pathResolve } from 'path';
import readline from 'readline';

type Position = {
  lat: number;
  lon: number;
}

export type RouteInputData = {
  routeId: string;
  clientId: string;
}

type RouteResponseData = RouteInputData & {
  position: Position;
  finished: boolean;
}

// loadRoutePositionsFromFile loads from a .txt file all positions (lat and lon) and returns them
function loadRoutePositionsFromFile(routeId: string): Promise<Position[]> {
  return new Promise<Position[]>((resolve, reject) => {
    const destinationsPath = pathResolve(
      __dirname,
      '..',
      '..',
      '..',
      'destinations',
      `${routeId}.txt`,
    );

    if (!destinationsPath) {
      reject('Invalid route id');
    }

    const readlineInterface = readline.createInterface({
      input: fs.createReadStream(destinationsPath),
    });

    const positions: Position[] = [];

    readlineInterface.on('line', (currentLine: string) => {
      const [latitude, longitude] = currentLine.split(',');

      positions.push({
        lat: Number(latitude),
        lon: Number(longitude),
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
        lat: Number(position.lat),
        lon: Number(position.lon),
      },
      finished: positions.length - 1 === index
    }));

  return routeData;
}

export { loadRoutePositionsFromFile, exportJsonPositions };
