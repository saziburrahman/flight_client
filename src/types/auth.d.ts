interface IAuthContext {
  isLoading: boolean;
  auth?: IAuth;
  updateAuth: (auth: IAuth) => void;
  login: (body:object) => void;
  register: (data: object) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

interface IAuth {
  username: string;
  email: string;
  role: string;
}

