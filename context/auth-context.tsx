"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  status: "ACTIVE" | "BANNED";
  technicianProfile?: {
    id: string;
    bio?: string;
    skills: string[];
    experienceYears: number;
    hourlyRate: number;
    location: string;
    isAvailable: boolean;
    rating: number;
    reviewCount: number;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (payload: any) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("auth_token");
    const savedUser = Cookies.get("auth_user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore parsing error
        }
      }
      // Re-verify with backend /auth/me
      api
        .get<{ user: User }>("/auth/me")
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
            Cookies.set("auth_user", JSON.stringify(res.data.user), { expires: 7 });
          }
        })
        .catch(() => {
          // If token is invalid or expired
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await api.post<{ user: User; accessToken: string }>("/auth/login", credentials);
      const userData = res.data?.user;
      const accessToken = res.data?.accessToken;

      if (!userData || !accessToken) {
        throw new Error("Invalid response from server.");
      }

      setToken(accessToken);
      setUser(userData);

      Cookies.set("auth_token", accessToken, { expires: 7 });
      Cookies.set("auth_user", JSON.stringify(userData), { expires: 7 });
      Cookies.set("user_role", userData.role, { expires: 7 });

      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: any) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", payload);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("auth_token");
    Cookies.remove("auth_user");
    Cookies.remove("user_role");
    router.push("/auth/login");
  };

  const refreshUser = async () => {
    try {
      const res = await api.get<{ user: User }>("/auth/me");
      if (res.data?.user) {
        setUser(res.data.user);
        Cookies.set("auth_user", JSON.stringify(res.data.user), { expires: 7 });
      }
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
