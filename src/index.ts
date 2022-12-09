import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/declarations/major/EnvVars';
import server from './server';


// **** Start server **** //

const msg = (port: number | string) => (
  'Express server started on port: ' + port.toString()
);

server.listen(EnvVars.port, () => logger.info(msg(EnvVars.port)));
