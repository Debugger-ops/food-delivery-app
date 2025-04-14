'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import './users.css'; // Make sure the path is correct based on your structure

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/users').then(response => {
      response.json().then(users => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }

  return (
    <section className="users-section">
      <UserTabs isAdmin={true} />
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
