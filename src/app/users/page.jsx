'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import './users.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading } = useProfile();
  useEffect(() => {
    fetch('/api/users')
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text(); // Try reading raw text for debugging
          console.error('Failed to fetch users:', text);
          return;
        }
        const users = await response.json();
        setUsers(users);
      })
      .catch((err) => {
        console.error('Network error fetching users:', err);
      });
  }, []);
  

  if (loading) {
    return 'Loading user info...';
  }

  return (
    <section className="users-section">
      <UserTabs /> {/* isAdmin removed */}
      <div className="user-list">
        {users?.length > 0 && users.map(user => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <div className="user-name">
                {user.name ? <span>{user.name}</span> : <span className="no-name">No name</span>}
              </div>
              <span className="user-email">{user.email}</span>
            </div>
            <div>
              <Link className="edit-button" href={'/users/' + user._id}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
