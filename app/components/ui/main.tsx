import { cn } from "@/app/lib/utils";

function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("flex w-full max-w-4xl flex-1 border-x", className)}
      {...props}
    />
  );
}

export { Main };
