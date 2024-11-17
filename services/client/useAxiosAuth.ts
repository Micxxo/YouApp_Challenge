"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "../hooks/api";

const useAxiosAuth = () => {
  const { data: session, update, status } = useSession();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      // const token = session?.user.
      return config;
    });
  });
};

export default useAxiosAuth;
