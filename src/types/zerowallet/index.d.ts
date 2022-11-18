export type SignedMessage = {
    transactionHash: string;
    r: string;
    s: string;
    v: number;
};

export type DeployWebHookAttributesType = {
    nonce: string;
    signedNonce: SignedMessage;
};
