process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import UserCard from "@/components/UserCard";
import { UserResponse } from "@/types/Users";
import Link from "next/link";

// SSR rendering
async function fetchUsers(): Promise<UserResponse[]> {
  const res = await fetch("https://localhost:7118/api/Users", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

  return res.json();
}

const Users = async () => {
  const users = await fetchUsers();

  return (
    <><div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <UserCard  key={user.id} id={user.id} name={user.name} surname={user.surname} />
      ))}
    </div>    
    <div className="flex flex-col items-center ">
      <Link href="users/add-user" className="btn btn-primary">Add New User</Link>
    </div>
    </>

  );
};

export default Users;
