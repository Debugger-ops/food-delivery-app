'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import './header.css';

function AuthLinks() {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;

  if (status === 'authenticated') {
    return (
      <>
        <Link href="/profile" className="whitespace-nowrap">
          Hello, {session?.user?.name || 'User'}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <Link className="n1" href="/login">Login</Link>
      <Link className="bg-primary rounded-full text-white px-8 py-2" href="/register">Register</Link>
    </>
  );
}

export default function Header() {
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
        <AuthLinks />
      </nav>
    </header>
  );
}
