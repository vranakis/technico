"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Exclude login page from protection
        if (pathname === "/login") {
            return;
        }

        // Check token in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [pathname, router]);

    // Skip rendering for non-authenticated pages
    if (pathname === "/login" || isAuthenticated) {
        return <>{children}</>;
    }

    return null; // Prevent rendering protected content for unauthenticated users
};

export default ProtectedRoute;