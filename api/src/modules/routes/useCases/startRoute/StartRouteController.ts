import { Request, Response } from 'express';

import { StartRouteUseCase } from './StartRouteUseCase';

export class StartRouteController {
  async handle(request: Request, response: Response) {
    const { id: routeId } = request.params;

    const startRouteUseCase = new StartRouteUseCase();

    await startRouteUseCase.execute({ routeId, clientId: '2' });

    return response.sendStatus(200);
  }
}
