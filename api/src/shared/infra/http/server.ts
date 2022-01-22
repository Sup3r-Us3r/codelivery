import { server } from './app';
import { startSocketIO } from '../websocket/socketio';
startSocketIO(server);
import '../websocket/listeners';
import '../kafka/consumers';

server.listen(3333, () => console.log('Server is running'));
