import { 
  isBuildExecTransaction, 
  isWebHookAttributes } from '@src/util/zerowallet-validator';
import express, { Router } from 'express';

import { body, validationResult } from 'express-validator';

import authRoutes from './auth-routes';
import gaslessRoutes from './gasless-routes';

// **** Init **** //


const apiRouter = Router();


// **** Setup auth routes **** //

const authRouter = Router();

// authorize user route
authRouter.post(
  authRoutes.paths.authorize,
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('gasTankName').isString(),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return authRoutes.authorize(req, res);
  },
);

// get Nonce route
authRouter.post(
  authRoutes.paths.getNonce, 
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('gasTankName').isString(),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return authRoutes.getNonce(req, res);
  },
);

// refresh Nonce route
authRouter.post(
  authRoutes.paths.refreshNonce,
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('gasTankName').isString(),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return authRoutes.refreshNonce(req, res);
  },
);

// add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);


// **** Setup gasless routes **** //
const gaslessRouter = Router();

// build transaction route
gaslessRouter.post(
  gaslessRoutes.paths.build, 
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('gasTankName').isString(),
  body('to').isString(),
  body('webHookAttributes').custom(isWebHookAttributes),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return gaslessRoutes.build(req, res);
  },
);

// send transaction route
gaslessRouter.post(
  gaslessRoutes.paths.send,
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('signature').isString(),
  body('gasTankName').isString(),
  body('webHookAttributes').custom(isWebHookAttributes),
  body('execTransactionBody').custom(isBuildExecTransaction),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return gaslessRoutes.send(req, res);
  },
);


// deploy transaction route
gaslessRouter.post(
  gaslessRoutes.paths.deploy,
  body('zeroWalletAddress')
    .isString()
    .isLength({ min: 42, max: 42 }),
  body('gasTankName').isString(),
  body('webHookAttributes').custom(isWebHookAttributes),
  (req: express.Request, res: express.Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return gaslessRoutes.deploy(req, res);
  },
);

// Add gaslessRouter
apiRouter.use(gaslessRoutes.paths.basePath, gaslessRouter);

// **** Export default **** //

export default apiRouter;
