import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Users from './users/page'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import LogoutButton from '@/app/components/LogOutButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><Link href="/users">All Users</Link></li>
                  
                </ul>
              </div>
              <Link href="/" className="btn btn-ghost text-xl">Technico v16</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
              <li><Link href="/users">All Users</Link></li>                
              </ul>
            </div>
            <div className="navbar-end">
              <LogoutButton></LogoutButton>
            </div>
          </div>
        </header>
        <ProtectedRoute>
        {children}
        </ProtectedRoute>
        <footer className='text-gray-400 text-center text-xs py-5'>
          Currently the #1 app in the world!
        </footer></body>
    </html>
  )
}
