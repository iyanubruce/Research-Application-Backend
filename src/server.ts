import Debug from 'debug';
import * as http from 'http';
// import db from './database/database';
import connectDB from './config/database';

import app from './app';
import appConfig from './config/env';
import logger from './utils/logger';

const debug = Debug('taja:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any): any {
  const port = Number(val);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  // hiusky shit
  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(appConfig.application.port);

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any): any {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr!.port}`;
  debug(`Listening on ${bind}`);
  logger.info(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);

connectDB();

server.listen(port);

export default server;
