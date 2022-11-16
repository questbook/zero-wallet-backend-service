export type BuildExecTransactionType = {
    to: string;
    value: number;
    data: string;
    operation: number;
    targetTxGas: number;
    baseGas: number;
    gasPrice: number;
    gasToken: string;
    refundReceiver: string;
    nonce: number;
};

export type SignedMessage = {
    transactionHash: string;
    r: string;
    s: string;
    v: number;
};

export type WebHookAttributesType = {
    nonce: string;
    signedNonce: SignedMessage;
    to: string;
    chainId: number;
};