import * as React from "react";
import { FieldError } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: FieldError | undefined | string;
  searchIconPos?: "right" | "left";
  searchIconClass?: string;
  variant?: "primary" | "secondary";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      isError,
      prefix,
      searchIconPos,
      searchIconClass,
      variant,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
      <div className="relative flex items-center">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex px-3 py-2 w-full pr-10 text-sm ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            variant === "primary" && "bg-[#FFFFFF0F] rounded-lg !py-4",
            variant === "secondary" &&
              "bg-[#D9D9D90F] border border-[#FFFFFF38] rounded-[8px]",
            isError
              ? "border-red-600 !bg-red-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              : "focus-visible:ring-ring",
            searchIconPos === "left" ? "pl-9" : ""
          )}
          ref={ref}
          onKeyDown={(e) => {
            if (
              type === "number" &&
              (e.key === "ArrowUp" || e.key === "ArrowDown")
            ) {
              e.preventDefault();
            }
          }}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              color="#6B7280"
              icon={showPassword ? "mdi:show-outline" : "mdi:hide-outline"}
              width={25}
            />
          </button>
        )}
        {type === "search" && (
          <Icon
            className={twMerge(
              cn(
                "absolute right-2 top-1/2 -translate-y-1/2 transform",
                searchIconPos === "left" ? "left-2" : ""
              ),
              searchIconClass
            )}
            icon="ic:baseline-search"
            width={25}
          />
        )}
        {prefix && (
          <Button
            disabled
            className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-r-none"
          >
            {prefix}
          </Button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
