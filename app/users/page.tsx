process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import UserCard from "@/components/UserCard";
import { UserResponse } from "@/types/Users";

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
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <UserCard  key={user.name} name={user.name} surname={user.surname} {...user} />
      ))}
    </div>
  );
};

export default Users;
