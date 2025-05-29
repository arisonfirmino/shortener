interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  showCopyright?: boolean;
}

const Container = ({
  children,
  className,
  showCopyright = false,
}: ContainerProps) => {
  return (
    <main
      className={`relative flex min-h-screen w-full flex-col items-center ${className}`}
    >
      {children}

      {showCopyright && (
        <p className="absolute bottom-5 text-xs text-black/30">
          © 2025 Arison. All Rights Reserved
        </p>
      )}
    </main>
  );
};

export default Container;
