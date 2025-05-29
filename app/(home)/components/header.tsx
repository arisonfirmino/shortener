import SignOutButton from "@/app/(home)/components/signout-button";

import { User } from "@prisma/client";
import { DotIcon } from "lucide-react";

interface HeaderProps {
  user: Pick<User, "email" | "username">;
  urlCount: number;
}

const Header = ({ user, urlCount }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-1">
          <h1 className="text-base font-medium">{user.username}</h1>
          {urlCount > 0 && (
            <>
              <DotIcon size={16} className="text-foreground/50" />
              <p className="text-foreground/50 text-xs">
                {urlCount}{" "}
                {urlCount > 1 ? "links encurtados" : "link encurtado"}
              </p>
            </>
          )}
        </div>
        <p className="text-foreground/50 text-sm">{user.email}</p>
      </div>

      <SignOutButton />
    </header>
  );
};

export default Header;
