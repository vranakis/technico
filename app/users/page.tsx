"use client";

import { useState, useEffect } from "react";
import UserCard from "@/app/components/UserCard";
import { UserResponse } from "@/types/Users";
import Link from "next/link";

const Users = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://localhost:7118/api/Users", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users data");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`https://localhost:7118/api/Users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove the user from the local state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the user.");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} id={user.id} name={user.name} surname={user.surname} onDelete={handleDelete} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Link href="users/add-user" className="btn btn-primary">
          Add New User
        </Link>
      </div>
    </>
  );
};

export default Users;