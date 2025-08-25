import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 cursor-pointer rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border bg-transparent text-foreground/70 hover:text-foreground/100 active:text-foreground/100 hover:border-primary active:border-primary",
        // secondary: "",
        // ghost: "",
        // link: "",
      },
      size: {
        default: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        // sm: "",
        lg: "h-10 rounded-2xl px-4 has-[>svg]:px-3",
        icon: "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
