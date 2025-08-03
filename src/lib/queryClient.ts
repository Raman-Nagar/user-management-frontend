import { QueryClient, type QueryFunction } from "@tanstack/react-query";
import { logout } from "../hooks/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_URL;
type UnauthorizedBehavior = "returnNull" | "throw";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    console.error(`API Error: ${res.status} - ${text}`);
    throw new Error(`${res.status}: ${text}`);
  }
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    logout()
    throw new Error("Failed to refresh token");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data.token;
};

export async function apiRequest<T>(
  method: string,
  url: string,
  data?: unknown,
  formData?: unknown
): Promise<T> {
  const makeRequest = async (accessToken?: string): Promise<Response> => {
    return await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers: {
        ...(data ? { "Content-Type": "application/json" } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: data ? JSON.stringify(data) : (formData || undefined),
    });
  };

  let token = localStorage.getItem("token");
  let res = await makeRequest(token);

  if (res.status === 401) {
    try {
      token = await refreshAccessToken();
      res = await makeRequest(token);
    } catch (err) {
      logout();
      throw new Error("Unauthorized and refresh failed");
    }
  }

  await throwIfResNotOk(res);
  return await res.json();
}

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const res = await fetch(queryKey.join("/") as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
