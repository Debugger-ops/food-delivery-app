'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './menuitems.css';

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => {
        const cleaned = data.map(item => ({
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
        }));
        setMenuItems(cleaned);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching menu items:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`/api/menu-items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMenuItems(prev => prev.filter(item => item._id !== itemId));
      } else {
        let error = { error: 'Unknown error' };
        try {
          error = await response.json();
        } catch {
          // non-JSON response
        }
        alert(`Failed to delete: ${error.error}`);
      }
    } catch (err) {
      alert(`Something went wrong: ${err.message}`);
    }
  };

  const handleEdit = (itemId) => {
    router.push(`/menu-items/edit/${itemId}`);
  };

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  return (
    <div className="menu-items-page">
      <div className="header-actions">
        <h1>Menu Items</h1>
        <Link href="/menu-items/new" className="add-button">
          Add New Item
        </Link>
      </div>

      <div className="menu-items-grid">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item._id} className="menu-item-card">
              <div className="image-container">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={180}
                    className="item-image"
                  />


                ) : (
                  <div className="placeholder-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={150}
                      className="item-image"
                    />
                  </div>
                )}
              </div>

              <div className="item-details">
                <h2>{item.name}</h2>
                <p className="price">
                  ₹{typeof item.price === 'number' && !isNaN(item.price) ? item.price.toFixed(2) : 'N/A'}
                </p>

                <p className="description">{item.description}</p>

                {item.category?.name && (
                  <span className="category-badge">{item.category.name}</span>
                )}
              </div>


              <div className="item-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">
            <p>No menu items found. Add your first menu item to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
