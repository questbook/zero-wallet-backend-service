import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes';

import { IReq, IRes } from './shared/types';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { 
  BuildExecTransactionType, 
  WebHookAttributesType 
} from '@src/types/zerowallet';

// **** Variables **** //

// Paths
const paths = {
  basePath: '/tx',
  send: '/send',
  build: '/build',
} as const;

// **** Types **** //

interface IBuildReq {
  zeroWalletAddress: string,
  data: TransactionRequest,
  webhookAttributes: WebHookAttributesType
}

interface ISendReq {
  execTransactionBody: BuildExecTransactionType,
  walletAddress: string,
  signature: string,
  webHookAttributes: WebHookAttributesType
}

// **** Functions **** //

/**
 * Get all users.
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function build(req: IReq<IBuildReq>, res: IRes) {
  const { zeroWalletAddress, data, webhookAttributes } = req.body;
  
  /* @TODO: call gastank.buildTransaction(
    {
      zeroWalletAddress,
      targetContractAddress: webhookAttributes.to,
      populatedTx: data,
      webHookAttributes
    }
  )

  return
  {
    scwAddress: string,
    safeTxBody: BuildExecTransactionType
  }
  */

  return res.status(HttpStatusCodes.OK).json();
}

/**
 * Send gasless transaction.
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function send(req: IReq<ISendReq>, res: IRes) {
  const { execTransactionBody, walletAddress, signature, webHookAttributes} = req.body;
  
  /*
    @TODO: call gastank.sendGaslessTransaction(
      {
        safeTXBody: BuildExecTransactionType;
        zeroWalletAddress: string;
        scwAddress: string;
        signature: string;
        webHookAttributes: WebHookAttributesType;
      }
    )

    return 
    {txHash: string}
  */
  
  return res.status(HttpStatusCodes.CREATED).end();
}


// **** Export default **** //

export default {
  paths,
  build,
  send,
} as const;
