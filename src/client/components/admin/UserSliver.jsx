import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";

function UserSliver({ user }) {
  const name =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username;

  const emailAddress = user.emailAddresses[0].emailAddress;
  const signedUpDate = new Date(user.createdAt).toLocaleDateString();
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.imageUrl} alt={user.username} />
        <AvatarFallback>{user.firstName}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{emailAddress}</p>
      </div>
      <div className="ml-auto font-medium">{signedUpDate}</div>
    </div>
  );
}

export default UserSliver;
