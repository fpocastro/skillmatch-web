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

import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";

const baseUrl = process.env.API_URL || "http://localhost:3000/api/v1";

class AuthService {
  signIn = async (credentials: SignInCredentials): Promise<AuthUser> => {
    await signIn({
      username: credentials.email,
      password: credentials.password,
    });

    return this.getCurrentUser();
  };

  getCurrentUser = async (): Promise<AuthUser> => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to retrieve user data");
    }

    const data: AuthUser = await response.json();
    return data;
  };

  signOut = async () => {
    await signOut();
  };

  getAccessToken = async (): Promise<string | null> => {
    const { tokens } = await fetchAuthSession();
    return tokens?.accessToken.toString() || null;
  };
}

export const authService = new AuthService();
