export interface SignInCredentials {
  email: string;
  password: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
  tokenExpiresIn: number;
}

export interface SignInResponse extends AuthTokens {
  user: AuthUser;
}

import { signIn, signOut } from "aws-amplify/auth";
import { api } from "./api";

class AuthService {
  signIn = async (credentials: SignInCredentials): Promise<AuthUser> => {
    await signIn({
      username: credentials.email,
      password: credentials.password,
    });

    return this.getCurrentUser();
  };

  getCurrentUser = async (): Promise<AuthUser> => {
    return api.get<AuthUser>("/auth/me");
  };

  signOut = async () => {
    await signOut();
  };
}

export const authService = new AuthService();
