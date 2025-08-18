'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import './usertabs.css';

export default function UserTabs() {
  const path = usePathname();

  return (
    <div className="tabs">
      <Link className={path === '/profile' ? 'tab active' : 'tab'} href="/profile">
        Profile
      </Link>
      <Link className={path === '/categories' ? 'tab active' : 'tab'} href="/categories">
        Categories
      </Link>
      <Link className={path.includes('menu-items') ? 'tab active' : 'tab'} href="/menu-items">
        Menu Items
      </Link>
      <Link className={path.includes('/users') ? 'tab active' : 'tab'} href="/users">
        Users
      </Link>
      <Link className={path === '/orders' ? 'tab active' : 'tab'} href="/orders">
        Orders
      </Link>
    </div>
  );
}
