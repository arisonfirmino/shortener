import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        outline:
          "border-border/10 text-foreground/50 hover:text-foreground hover:border-border/50 active:text-foreground active:border-border/50 border bg-transparent [&_svg:not([class*='size-'])]:size-3.5",
        link: "w-fit hover:underline active:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:justify-between has-[>svg]:px-3",
        icon: "size-8 rounded-xl",
        link: "",
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
