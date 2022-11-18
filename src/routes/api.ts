import { Router } from 'express';

import jetValidator from 'jet-validator/dist/jet-validator';

import authRoutes from './auth-routes';
import gaslessRoutes from './gasless-routes';


// **** Init **** //

const validate = jetValidator();

const apiRouter = Router();


// **** Setup auth routes **** //

const authRouter = Router();

// Authorize user route
authRouter.post(
  authRoutes.paths.authorize,
  validate("zeroWalletAddress", "gasTankName"),
  authRoutes.authorize,
);

// Get Nonce route
authRouter.post(
  authRoutes.paths.getNonce, 
  validate("zeroWalletAddress", "gasTankName"),
  authRoutes.getNonce,
);

authRouter.post(
  authRoutes.paths.refreshNonce,
  validate("zeroWalletAddress", "gasTankName"),
  authRoutes.refreshNonce,
);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);


// **** Setup gasless routes **** //
const gaslessRouter = Router();

// Add build transaction route
gaslessRouter.post(
  gaslessRoutes.paths.build, 
  validate(
    "zeroWalletAddress", 
    "data", 
    "webHookAttributes", 
    "gasTankName",
  ),
  gaslessRoutes.build,
);

// Add send transaction route
gaslessRouter.post(
  gaslessRoutes.paths.send,
  validate(
    "zeroWalletAddress", 
    "signature", 
    "webHookAttributes", 
    "gasTankName", 
    "execTransactionBody",
  ),
  gaslessRoutes.send,
);

gaslessRouter.post(
  gaslessRoutes.paths.deploy,
  validate(
    "zeroWalletAddress",
    "gasTankName",
    "webHookAttributes",
  ),
  gaslessRoutes.deploy,
);

// Add gaslessRouter
apiRouter.use(gaslessRoutes.paths.basePath, gaslessRouter);

// **** Export default **** //

export default apiRouter;
