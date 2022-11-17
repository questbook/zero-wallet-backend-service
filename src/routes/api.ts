import { Router } from 'express';

import authRoutes from './auth-routes';
import gaslessRoutes from './gasless-routes';


// **** Init **** //

const apiRouter = Router();


// **** Setup auth routes **** //

const authRouter = Router();

// Authorize user route
authRouter.post(
  authRoutes.paths.authorize,
  authRoutes.authorize,
);

// Get Nonce route
authRouter.post(
  authRoutes.paths.getNonce, 
  authRoutes.getNonce,
);

authRouter.post(
  authRoutes.paths.refreshNonce,
  authRoutes.refreshNonce,
);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);


// **** Setup gasless routes **** //
const gaslessRouter = Router();

// Add build transaction route
gaslessRouter.post(
  gaslessRoutes.paths.build, 
  gaslessRoutes.build,
);

// Add send transaction route
gaslessRouter.post(
  gaslessRoutes.paths.send,
  gaslessRoutes.send,
);

gaslessRouter.post(
  gaslessRoutes.paths.deploy,
  gaslessRoutes.deploy,
);

// Add gaslessRouter
apiRouter.use(gaslessRoutes.paths.basePath, gaslessRouter);

// **** Export default **** //

export default apiRouter;
