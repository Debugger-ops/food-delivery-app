'use client';
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './editmenu.css';

export default function EditMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading } = useProfile();

  useEffect(() => {
    if (!id) return;
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(items => {
        const item = items.find(i => i._id === id);
        console.log('Loaded menu item:', item);
        setMenuItem(item);
      });
  }, [id]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => {
        console.error('Failed to load categories:', err);
        toast.error('Failed to load categories');
      });
  }, []);

  // ✅ FIXED: Removed ev parameter
  async function handleFormSubmit(data) {
    data = { ...data, _id: id };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE',
      });
      res.ok ? resolve() : reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  useEffect(() => {
    if (redirectToItems) {
      redirect('/menu-items');
    }
  }, [redirectToItems]);

  if (loading || !menuItem) {
    return 'Loading...';
  }

  return (
    <section className="edit-section">
      <UserTabs />

      <div className="container">
        <Link href="/menu-items" className="back-button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>

      <MenuItemForm 
        menuItem={menuItem} 
        categories={categories}
        onSubmit={handleFormSubmit} 
      />

      <div className="delete-button-wrapper">
        <DeleteButton
          label="Delete this menu item"
          onDelete={handleDeleteClick}
        />
      </div>
    </section>
  );
}
