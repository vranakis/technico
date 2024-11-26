"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mock credentials
        if (username === "admin" && password === "admin") {
            setError(null);
            setIsLoading(true); // Show loading indicator
            localStorage.setItem("token", "mock-admin-token");

            // Redirect to the front page after 2 seconds
            setTimeout(() => {
                setIsLoading(false);
                router.push("/");
            }, 2000);
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl mb-5">Admin Login</h1>
            <form onSubmit={handleSubmit} className="w-96 p-4 border rounded-lg">
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;