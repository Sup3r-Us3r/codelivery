import { RouteModel } from '../../infra/mongodb/schemas/Route';
import { AppError } from '../../../../shared/error/AppError';

export class FindAllRoutesUseCase {
  async execute() {
    try {
      const routes = await RouteModel.find().exec();

      return routes;
    } catch {
      throw new AppError('Error listing routes', 500);
    }
  }
}
