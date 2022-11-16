import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import { IReq, IRes } from './shared/types';

// **** Variables **** //

// Paths
const paths = {
  basePath: '/auth',
  authorize: '/authorize',
  getNonce: '/getNonce',
} as const;


// **** Types **** //

interface ILoginReq {
  webwallet_address: string;
}


// **** Functions **** //

/**
 * Add an authorized user to the database
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function authorize(req: IReq<ILoginReq>, res: IRes) {
  const { webwallet_address } = req.body;
  
  // @TODO: call authorizer.addAuthorizedUser(webwallet_address)

  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function getNonce(req: IReq<ILoginReq>, res: IRes) {
  const { webwallet_address } = req.body;
  
  // @TODO: call authorizer.getNonce(webwallet_address)

  return res.status(HttpStatusCodes.OK).json({authorize: false});
}


// **** Export default **** //

export default {
  paths,
  authorize,
  getNonce,
} as const;
