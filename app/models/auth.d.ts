export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar: string | null;
}

interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
    token: string;
  };
}

interface IAuthSession {
  user: IUser;
  token: string;
}
