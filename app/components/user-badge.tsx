import { DefaultSession } from "next-auth";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const UserBadge = ({ user }: { user: DefaultSession["user"] }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user?.image ?? ""} />
        <AvatarFallback />
      </Avatar>
      <p className="text-base">{user?.name}</p>
    </div>
  );
};

export default UserBadge;
