import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/declarations/major/EnvVars';
import server from './server';


// **** Start server **** //

const msg = (port: number | string) => (
  'Express server started on port: ' + port.toString()
);

server.listen(EnvVars.ports[0], () => logger.info(msg(EnvVars.ports[0])));
server.listen(EnvVars.ports[1], () => logger.info(msg(EnvVars.ports[1])));
server.listen(EnvVars.ports[2], () => logger.info(msg(EnvVars.ports[2])));
