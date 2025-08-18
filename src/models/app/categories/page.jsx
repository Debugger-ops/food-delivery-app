'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UserTabs from "@/components/layout/UserTabs";
import './categories.css';

function CategoriesPage() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch categories:', errorText);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCategories();
    }
    setProfileFetched(true);
  }, [session, status]);

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
      setEditedCategory(null);
    } else {
      console.error('Failed to update category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchCategories();
      setDeleteConfirm(null);
    } else {
      console.error('Failed to delete category');
    }
  };

  const startEditingCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category.name);
  };

  const cancelEdit = () => {
    setEditedCategory(null);
    setCategoryName('');
  };

  if (status === 'loading' || !profileFetched) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please log in to manage categories</div>;
  }
  return (
    <div className="categories-container">
      <UserTabs />
      <div className="categories-header">
        <h1 className="categories-title">
          <span className="golden-text">Menu Categories</span>
          <span className="subtitle">Organize Your Delicious Offerings</span>
        </h1>
      </div>

      <div className="add-category-form">
        <input
          className="category-input"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <div className="form-buttons">
          {categoryName && (
            <button 
              className={`action-button ${editedCategory ? 'update-button' : 'add-button'}`}
              onClick={editedCategory ? handleUpdateCategory : handleAddCategory}
            >
              {editedCategory ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                  <span>Update</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  <span>Add</span>
                </>
              )}
            </button>
          )}
          
          {editedCategory && (
            <button className="cancel-button" onClick={cancelEdit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      <ul className="categories-list">
        {categories.length === 0 && (
          <div className="no-categories">No categories yet. Add your first one!</div>
        )}
        
        {categories.map((category) => (
          <li key={category._id} className={`category-item ${editedCategory?._id === category._id ? 'editing' : ''}`}>
            <div className="category-content">
              <span className="category-name">{category.name}</span>
            </div>
            
            <div className="category-actions">
              <button
                className="action-button edit-button"
                onClick={() => startEditingCategory(category)}
                title="Edit category"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                <span>Edit</span>
              </button>
              
              {deleteConfirm === category._id ? (
                <div className="delete-confirm">
                  <span>Are you sure?</span>
                  <button 
                    className="action-button confirm-delete"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    ✔ Confirm
                  </button>
                  <button 
                    className="action-button cancel-delete"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    ✖ Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="action-button delete-button"
                  onClick={() => setDeleteConfirm(category._id)}
                  title="Delete category"
                >
                  🗑 Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
