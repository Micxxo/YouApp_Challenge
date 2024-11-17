"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "../hooks/api";

const useAxiosAuth = () => {
  const { data: session, update, status } = useSession();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = session?.user.access_token;
        if (token) {
          config.headers["x-access-token"] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response?.status === 500 &&
          error.response.data.message === "Internal server error"
        ) {
          signOut();
          return;
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [session, update, baseURL, status]);

  return api;
};

export default useAxiosAuth;
