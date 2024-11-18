"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "./validations/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toastHelper from "@/helpers/toastHelper";
import { loginHooks } from "@/services/hooks/auth/login";

const ManageLoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      keyword: "",
      password: "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof loginSchema>) => {
    const loadingToast = toastHelper("sasa", "loading");
    try {
      const res = await loginHooks(value);
      if (res?.ok) {
        // router.push("/");
      } else {
        toastHelper(res?.error ?? "", "error", "", loadingToast);
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    form.getValues().keyword === "" || form.getValues().password === "";

  return (
    <div className="text-white pb-10">
      <div className="pl-3">
        <p className="font-bold text-2xl">Login</p>
      </div>
      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      variant="primary"
                      placeholder="Email/Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      variant="primary"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative w-full pt-4">
              <Button
                type={"submit"}
                className="!w-full relative z-10"
                variant={"glow"}
                size="lg"
                disabled={isButtonDisabled || loading}
              >
                Login
              </Button>
              {!isButtonDisabled && (
                <div className="absolute top-8 w-full h-[30px] bg-glow-gradient-50 blur-[20px] fade-in-50"></div>
              )}
            </div>
          </form>
        </Form>
        <div className="mt-14 w-full">
          <p className="text-center text-sm font-medium">
            No account?{" "}
            <span className="gradient-golden-text underline">
              <a href={"/register"} className="underline">
                Register here
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageLoginPage;
