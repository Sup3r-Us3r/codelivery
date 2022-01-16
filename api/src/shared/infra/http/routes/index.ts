import { Router } from 'express';
import { FindAllRoutesController } from '../../../../modules/routes/useCases/findAllRoutes/FindAllRoutesController';
import { StartRouteController } from '../../../../modules/routes/useCases/startRoute/StartRouteController';

const findAllRoutesController = new FindAllRoutesController();
const startRouteController = new StartRouteController();

const routes = Router();

routes.get('/routes', findAllRoutesController.handle);
routes.get('/route/:id/start', startRouteController.handle);

export { routes };
