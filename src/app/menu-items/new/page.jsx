'use client';
import { useEffect, useState } from 'react';
import MenuItemForm from '@/components/layout/MenuItemForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import './newmenu.css'; // Import the CSS file

export default function NewMenuItemPage() {
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch categories from API
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => {
        console.error('Failed to load categories:', err);
        toast.error('Failed to load categories');
      });
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Menu item created successfully!');
        router.push('/menu-items'); // Redirect to menu items list
      } else {
        const err = await response.json();
        toast.error(`Failed to create menu item: ${err.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-menu-container">
      <div className="page-header">
        <h1>Create New Menu Item</h1>
        <p className="subtitle">Add a new delicious item to your menu</p>
      </div>
      <MenuItemForm 
        onSubmit={handleFormSubmit} 
        categories={categories} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
