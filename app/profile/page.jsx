'use client';

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './profile.css';

export default function ProfilePage() {
  const { status, data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  console.log("ProfilePage session:", session);
  console.log("ProfilePage status:", status);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Profile data fetched:", data);
          setUser(data);
          setIsAdmin(data.admin); // Ensure this is correctly set
          setProfileFetched(true);
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error saving profile',
    });
  }

  if (status === 'loading' || !profileFetched) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="profile-page">
      <UserTabs isAdmin={isAdmin} />
      <div className="form-wrapper">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}