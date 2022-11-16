import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import { IReq, IRes } from './shared/types';

import zeroWallet from '../zero-wallet';

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
  gas_tank_name: string;
}


// **** Functions **** //

/**
 * Add an authorized user to the database
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function authorize(req: IReq<ILoginReq>, res: IRes) {

  const { webwallet_address, gas_tank_name } = req.body;

  const gastank = zeroWallet.getGasTank(gas_tank_name);

  if (!gastank) {
    return res.status(
      HttpStatusCodes.BAD_REQUEST).json({ error: 'Gas tank not found' },
    );
  }

  await gastank.addAuthorizedUser(webwallet_address);

  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Get the nonce of an authorized user
 */
async function getNonce(req: IReq<ILoginReq>, res: IRes) {
  
  const { webwallet_address, gas_tank_name } = req.body;

  const gasTank = zeroWallet.getGasTank(gas_tank_name);

  if (!gasTank) {
    return res.status(
      HttpStatusCodes.BAD_REQUEST).json({ error: 'Gas tank not found' }
    );
  }

  const nonce = await gasTank.getNonce(webwallet_address);

  if(!nonce){
    return res.status(HttpStatusCodes.OK).json({ nonce: 'Token expired' });
  }

  return res.status(HttpStatusCodes.OK).json({ nonce: nonce });
}


// **** Export default **** //

export default {
  paths,
  authorize,
  getNonce,
} as const;
