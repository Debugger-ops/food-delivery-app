'use client';
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './edituser.css'; // Adjust path if needed

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then(res => {
      res.json().then(user => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      });
      res.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });
  }

  if (loading) return 'Loading user profile...';
  if (!data.admin) return 'Not an admin';

  return (
    <section className="edit-user-section">
      <UserTabs isAdmin={true} />
      <div className="edit-user-form">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
