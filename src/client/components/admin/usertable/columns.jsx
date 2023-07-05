import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/Avatar";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu";

export const columns = [
  {
    accessorKey: "emailAddresses",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const emailAddress = row.getValue("emailAddresses")[0].emailAddress;
      return (
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{emailAddress}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }) => {
      const name = row.getValue("firstName");
      return (
        <Avatar className="h-9 w-9">
          <AvatarImage src={row.getValue("imageUrl")} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Signed Up
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const signedUpDate = new Date(
        row.getValue("createdAt")
      ).toLocaleDateString();
      return <div className="ml-auto font-medium">{signedUpDate}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "publicMetadata",
    header: "Admin",
    cell: ({ row }) => {
      const metaData = row.getValue("publicMetadata");
      return (
        <div className="ml-auto font-medium">
          {metaData.isAdmin ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log("Delete Clicked")}>
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
