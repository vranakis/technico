'use client';

import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        router.push('/login'); // Redirect to login after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>A not authenticated user detected... Redirecting to login...</p>;
  }

  return (
    <>
      <h1 className="text-center text-3xl text-gray-600 m-5">Technico App</h1>
      <p className="text-center text-1xl text-gray-600 m-5">
        The best app out there. <br />
        By far. <br />
        It&apos;s not even close.
      </p>
      {isAdmin ? <AdminContent /> : <UserContent />}
    </>
  );
}

function AdminContent() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Manage users, view reports, and handle system tasks.</p>
    </div>
  );
}

function UserContent() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>View your tasks, progress, and updates here.</p>
    </div>
  );
}
