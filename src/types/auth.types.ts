export type CognitoUser = {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string;
    authFlowType?: string;
  };
};
