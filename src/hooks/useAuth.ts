import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { toast } from "sonner";
import type { SignupFormType } from "../shemas/sign-up-schemas";
import type { LoginFormType } from "../shemas/login-schemas";
import type { UserType } from "../types";

interface AuthUser {
  user: UserType | unknown;
  isLoading: boolean;
  isAuthenticated: boolean
}

export function useAuth(): AuthUser {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => await apiRequest("GET", `/user/me`),
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}


export const useSignup = () =>
  useMutation({
    mutationFn: (data: Omit<SignupFormType, "cPassword">) =>
      apiRequest("POST", "/auth/register", data),
    onSuccess: (data: unknown) => {
      toast(data?.message);
    }
  });


export const verifyEmail = async (token: string | null) => {
  if (!token) throw new Error("Token missing in URL");
  return await apiRequest("GET", `/auth/verify-email?token=${token}`);
};

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginFormType) =>
      apiRequest("POST", "/auth/login", data),
    onSuccess: (data: unknown) => {
      toast(data?.message);
      localStorage.setItem("token", data?.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: { email: string }) =>
      apiRequest("POST", "/auth/forgot-password", data),
    onSuccess: (data: unknown) => {
      toast(data?.message);
    }
  });

export const useResetPassword = (token: string | null) => {
  if (!token) throw new Error("Token missing in URL");
  return useMutation({
    mutationFn: (data: { password: string }) =>
      apiRequest("POST", `/auth/reset-password/${token}`, data),
    onSuccess: (data: unknown) => {
      toast(data?.message);
    }
  });
}

export const logout = () => {
  toast("Logout Successfully");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

