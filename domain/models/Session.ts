export type SessionUser = {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string;
    authFlowType?: string;
  };
};
