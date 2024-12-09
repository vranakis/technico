"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        router.push("/login"); // Redirect to login page
    };

    return (
        <button onClick={handleLogout} className="btn btn-primary">
            Logout
        </button>
    );
};

export default LogoutButton;