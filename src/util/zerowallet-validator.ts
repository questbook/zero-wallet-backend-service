import { 
  BuildExecTransactionType,
  DeployWebHookAttributesType,
  SignedMessage,
  WebHookAttributesType,
} from '@hasankhadra/zero-wallet-server/build/main/types';

const isWebHookAttributes = (
  attributes: { 
    [key: string]: SignedMessage | number | string 
  }): attributes is WebHookAttributesType => {

  if(!attributes) {
    throw new Error('WebHookAttributes is undefined');
  }

  if(typeof attributes !== 'object') {
    throw new Error('WebHookAttributes is not an object');
  }

  if(typeof attributes?.to !== 'string') {
    throw new Error('WebHookAttributes.to is not a string');
  }

  if(typeof attributes?.nonce !== 'string') {
    throw new Error('WebHookAttributes.nonce is not a string');
  }

  if(typeof attributes?.chainId !== 'number') {
    throw new Error('WebHookAttributes.chainId is not a number');
  }

  if(typeof attributes?.signedNonce !== 'object') {
    throw new Error('WebHookAttributes.signedNonce is not an object');
  }

  if(typeof attributes?.signedNonce?.transactionHash !== 'string') {
    throw new Error(
      'WebHookAttributes.signedNonce.transactionHash is not a string',
    );
  } 

  if(typeof attributes?.signedNonce?.r !== 'string') {
    throw new Error('WebHookAttributes.signedNonce.r is not a string');
  }

  if(typeof attributes?.signedNonce?.s !== 'string') {
    throw new Error('WebHookAttributes.signedNonce.s is not a string');
  }

  if(typeof attributes?.signedNonce?.v !== 'number') {
    throw new Error('WebHookAttributes.signedNonce.v is not a number');
  }

  return true;
  
};
const isDeployWebHookAttributes = (
  attributes: { 
    [key: string]: SignedMessage | string 
  }): attributes is DeployWebHookAttributesType => {

  if(!attributes) {
    throw new Error('WebHookAttributes is undefined');
  }
  
  if(typeof attributes !== 'object') {
    throw new Error('WebHookAttributes is not an object');
  }

  if(typeof attributes?.nonce !== 'string') {
    throw new Error('WebHookAttributes.nonce is not a string');
  }
  
  if(typeof attributes?.signedNonce !== 'object') {
    throw new Error('WebHookAttributes.signedNonce is not an object');
  }
  
  if(typeof attributes?.signedNonce?.transactionHash !== 'string') {
    throw new Error(
      'WebHookAttributes.signedNonce.transactionHash is not a string',
    );
  } 
  
  if(typeof attributes?.signedNonce?.r !== 'string') {
    throw new Error('WebHookAttributes.signedNonce.r is not a string');
  }
  
  if(typeof attributes?.signedNonce?.s !== 'string') {
    throw new Error('WebHookAttributes.signedNonce.s is not a string');
  }
  
  if(typeof attributes?.signedNonce?.v !== 'number') {
    throw new Error('WebHookAttributes.signedNonce.v is not a number');
  }
  
  return true;
};

const isBuildExecTransaction = (
  attributes: {
    [key: string]: number | string
  }): attributes is BuildExecTransactionType => {
    

  if(!attributes) {
    throw new Error('BuildExecTransaction is undefined');
  }

  if(typeof attributes !== 'object') {
    throw new Error('BuildExecTransaction is not an object');
  }

  if(typeof attributes?.to !== 'string') {
    throw new Error('BuildExecTransaction.to is not a string');
  }

  if(typeof attributes?.value !== 'number') {
    throw new Error('BuildExecTransaction.value is not a number');
  }

  if(typeof attributes?.data !== 'string') {
    throw new Error('BuildExecTransaction.data is not a string');
  }

  if(typeof attributes?.baseGas !== 'number') {
    throw new Error('BuildExecTransaction.baseGas is not a number');
  }

  if(typeof attributes?.gasPrice !== 'number') {
    throw new Error('BuildExecTransaction.gasPrice is not a number');
  }

  if(typeof attributes?.gasToken !== 'string') {
    throw new Error('BuildExecTransaction.gasToken is not a string');
  }

  if(typeof attributes?.refundReceiver !== 'string') {
    throw new Error('BuildExecTransaction.refundReceiver is not a string');
  }

  if(typeof attributes?.operation !== 'number') {
    throw new Error('BuildExecTransaction.operation is not a number');
  }

  if(typeof attributes?.nonce !== 'number') {
    throw new Error('BuildExecTransaction.nonce is not a number');
  }

  if(typeof attributes?.targetTxGas !== 'number') {
    throw new Error('BuildExecTransaction.targetTxGas is not a number');
  }

  return true;

};

export { 
  isWebHookAttributes, 
  isBuildExecTransaction, 
  isDeployWebHookAttributes,
};
