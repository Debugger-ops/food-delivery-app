'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Assuming you're using NextAuth
import UserTabs from "@/components/layout/UserTabs";
import './categories.css';

function CategoriesPage() {
  const { data: session, status } = useSession(); // Access session data and status
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null); // For editing a category
  const [profileFetched, setProfileFetched] = useState(false); // To track if profile is fetched

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      // Set isAdmin based on session role
      setIsAdmin(session?.user?.role === 'admin'); // Ensure you're checking the role from session data
      fetchCategories();
    }
    setProfileFetched(true); // Set profileFetched to true once session check completes
  }, [session, status]); // Re-run when session or status changes

  const handleAddCategory = async () => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });

    if (response.ok) {
      await fetchCategories();
      setCategoryName('');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const categoryToDelete = categories.find(cat => cat._id === categoryId);

    if (categoryToDelete?.isProtected) {
      alert('You cannot delete a protected category.');
      return;
    }

    const response = await fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchCategories();
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditedCategory(category); // Set the category being edited
  };

  const handleUpdateCategory = async () => {
    if (!editedCategory) return;

    const response = await fetch(`/api/categories/${editedCategory._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });

    if (response.ok) {
      await fetchCategories();
      setCategoryName('');
      setEditedCategory(null); // Reset the edited category after updating
    }
  };

  // Loading state while session is still being checked
  if (status === 'loading' || !profileFetched) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    return <div>Please log in to manage categories</div>;
  }

  return (
    <div className="categories-container">
      <UserTabs isAdmin={isAdmin} /> {/* Make sure UserTabs uses the isAdmin prop correctly */}
      <div className="categories-header">
        <h1 className="categories-title">Categories Management</h1>
      </div>

      <div className="add-category-form">
        <input
          className="category-input"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        {categoryName && (
          <button className="add-button" onClick={editedCategory ? handleUpdateCategory : handleAddCategory}>
            {editedCategory ? 'Update Category' : 'Add Category'}
          </button>
        )}
      </div>

      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category._id} className="category-item">
            <span>{category.name}</span>
            <div className="category-actions">
              {isAdmin && (
                <>
                  <button
                    className="edit-button"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
