import * as React from "react";

import { cn } from "@/app/lib/utils";

import { FieldError } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldError | undefined;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      autoComplete="off"
      className={cn(
        "placeholder:text-foreground/50 bg-background border-input/10 flex h-10 w-full rounded-2xl border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:bg-transparent placeholder:lowercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-1",
        error &&
          "border-red-600 focus-visible:border-red-600 focus-visible:ring-1 focus-visible:ring-red-600",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
