'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HamburgerIcon from '../icons/Hamburger';
import ShoppingCart from "@/components/icons/ShoppingCart";
import { useSession, signOut } from 'next-auth/react';
import { CartContext } from '@/components/AppContext'; // adjust path if needed
import './header.css'; // Import custom CSS

function AuthLinks({ status, userData }) {
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'authenticated') {
    let userName = userData?.name || userData?.email || 'User'; // First try userData.name, then fallback to email
    
    // If user name exists and contains a space, extract the first part (first name)
    if (userName.includes(' ')) {
      userName = userName.split(' ')[0]; // Extract the first name part
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
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Mock search suggestions - replace with actual API call in production
  const mockMenuItems = [
    { id: 1, name: 'Golden Burger', category: 'Burgers' },
    { id: 2, name: 'Classic Pizza', category: 'Pizza' },
    { id: 3, name: 'Crispy Fries', category: 'Sides' },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts' },
    { id: 5, name: 'Caesar Salad', category: 'Salads' },
  ];

  useEffect(() => {
    // Close search results when clicking outside
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter menu items based on search query
      const filtered = mockMenuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="head">
      <Link className="headline" href="/">GoldenBites</Link>
      
      <nav className="navlink">
        <Link className="n1" href="/">Home</Link>
        <Link className="n1" href="/menu">Menu</Link>
        <div className="search-container" ref={searchRef}>
          <form onSubmit={handleSearch} className="search-bar">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="search-input"
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </form>
          
          {isSearchFocused && searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((item) => (
                  <li key={item.id}>
                    <Link href={`/menu/${item.id}`} onClick={() => setIsSearchFocused(false)}>
                      <span className="search-item-name">{item.name}</span>
                      <span className="search-item-category">{item.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
      
      <nav className="navlink">
        <AuthLinks status={status} userData={session?.user} />
        <Link href={'/cart'} className="relative">
          <ShoppingCart />
          {cartProducts?.length > 0 && (
            <span className="absolute">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}