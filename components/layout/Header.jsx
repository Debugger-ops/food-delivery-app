'use client';

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { CartContext } from '@/components/AppContext'; // adjust path if needed
import './header.css'; // optional

function AuthLinks({ status, userData }) {
  // For debugging
  console.log("Auth status:", status);
  console.log("User data:", userData);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    let userName = userData?.name || userData?.email || 'User';
    if (userName.includes(' ')) {
      userName = userName.split(' ')[0];
    }

    return (
      <div className="auth-controls">
        <Link href="/profile" className="user_name">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <div className="auth-controls">
        <Link className="n1" href="/login">Login</Link>
        <Link className="n5 bg-primary rounded-full text-white px-4 py-2" href="/register">
          Register
        </Link>
      </div>
    );
  }
}

export default function Header() {
  const { status, data: session } = useSession();
  console.log("Session in header:", session);
  console.log("Session status:", status);

  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="head">
      <Link className="headline" href="/">GoldenBites</Link>

      <nav className="navlink">
        <Link className="n1" href="/">Home</Link>
        <Link className="n1" href="/menu">Menu</Link>
        <Link className="n1" href="/about">About</Link>
        <Link className="n1" href="/contact">Contact</Link>
      </nav>

      <nav className="navlink">
        <AuthLinks status={status} userData={session?.user} />
      </nav>
    </header>
  );
}