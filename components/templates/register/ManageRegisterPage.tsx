"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "./validations/registerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ManageRegisterPage = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (value: z.infer<typeof registerSchema>) => {
    console.log(value);
  };

  const isButtonDisabled =
    form.getValues().email === "" ||
    form.getValues().username === "" ||
    form.getValues().password === "" ||
    form.getValues().confirmPassword === "";

  return (
    <div className="text-white">
      <div className="pl-3">
        <p className="font-bold text-2xl">Register</p>
      </div>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      variant="primary"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      variant="primary"
                      placeholder="Create Username"
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
                      placeholder="Create Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      variant="primary"
                      placeholder="Confirm Password"
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
                disabled={isButtonDisabled}
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
            Have an account?{" "}
            <span className="gradient-golden-text">
              <a href={"/login"}>Login here</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageRegisterPage;
