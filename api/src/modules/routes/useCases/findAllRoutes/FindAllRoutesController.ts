import { Request, Response } from 'express';

import { FindAllRoutesUseCase } from './FindAllRoutesUseCase';

export class FindAllRoutesController {
  async handle(request: Request, response: Response) {
    const findAllRoutesUseCase = new FindAllRoutesUseCase();

    const routes = await findAllRoutesUseCase.execute();

    return response.json(routes);
  }
}
