import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

export function startSocketIO(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
  });
}

export { io };
