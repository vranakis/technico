import Link from "next/link";
import { URLS } from "@/app/lib/constants";
import type { User } from "@/types/Users";

type UserCardProps = User & { id?: string };

const UserCard = ({ id, name, surname }: UserCardProps) => {
    return (
      <div className="bg-gray-800 text-gray-100 p-4 m-2 rounded-lg shadow-md ">
        <h3 className="text-xl font-bold mb-2">
          {id ? <Link href={URLS.user(id)}>{name} {surname}</Link> : name}
        </h3>
      </div>
    );
  };
  
  export default UserCard;
