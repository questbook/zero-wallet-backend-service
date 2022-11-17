import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import { IReq, IRes } from './shared/types';
import { 
  BuildExecTransactionType, 
  WebHookAttributesType,
  DeployWebHookAttributesType,
} from '@src/types/zerowallet';

import zeroWallet from '../zero-wallet';

// **** Variables **** //

// Paths
const paths = {
  basePath: '/tx',
  send: '/send',
  build: '/build',
  deploy: '/deploy',
} as const;

// **** Types **** //

interface IBuildReq {
  zeroWalletAddress: string,
  data: string,
  webHookAttributes: WebHookAttributesType,
  gasTankName: string
}

interface ISendReq {
  execTransactionBody: BuildExecTransactionType,
  zeroWalletAddress: string,
  signature: string,
  webHookAttributes: WebHookAttributesType,
  gasTankName: string
}

interface IDeployReq {
  zeroWalletAddress: string,
  gasTankName: string,
  webHookAttributes: DeployWebHookAttributesType;
}

// **** Functions **** //

/**
 * Get all users.
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function build(req: IReq<IBuildReq>, res: IRes) {
  const { zeroWalletAddress, data, webHookAttributes, gasTankName } = req.body;
  
  const gastank = zeroWallet.getGasTank(gasTankName);

  const { safeTXBody, scwAddress } = await gastank.buildTransaction(
    {
      zeroWalletAddress,
      populatedTx: data,
      webHookAttributes,
      targetContractAddress: webHookAttributes.to,
    },
  );

  return res.status(HttpStatusCodes.OK).json({ safeTXBody, scwAddress });
}

/**
 * Send gasless transaction.
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function send(req: IReq<ISendReq>, res: IRes) {
  const { 
    execTransactionBody, 
    zeroWalletAddress, 
    signature, 
    webHookAttributes, 
    gasTankName,
  } = req.body;
  
  const gasTank = zeroWallet.getGasTank(gasTankName);

  const {walletAddress: scwAddress} = await gasTank.doesProxyWalletExist(
    zeroWalletAddress,
  );

  const txHash = await gasTank.sendGaslessTransaction(
    {
      safeTXBody: execTransactionBody,
      zeroWalletAddress,
      scwAddress,
      signature,
      webHookAttributes,
    },
  );
  
  return res.status(HttpStatusCodes.CREATED).json({ txHash });
}


/**
 * Deploy the smart contract wallet
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function deploy(req: IReq<IDeployReq>, res: IRes) {
  const { zeroWalletAddress, gasTankName, webHookAttributes } = req.body;

  const newWebHookAttributes = {
    ...webHookAttributes,
    to: 'to_be_removed',
    chainId: 0,
  };

  const gasTank = zeroWallet.getGasTank(gasTankName);

  await gasTank.deployProxyWallet({ 
    zeroWalletAddress, 
    webHookAttributes: newWebHookAttributes,
  });
  
  return res.status(HttpStatusCodes.CREATED).end();
}

// **** Export default **** //

export default {
  paths,
  build,
  send,
  deploy,
} as const;
