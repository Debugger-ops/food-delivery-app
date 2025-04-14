'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './menuitems.css'; // Import the CSS file for styling

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch menu items from API
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
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
        // Safely handle potential empty response body
        let error = { error: 'Unknown error' };
        try {
          error = await response.json();
        } catch (jsonError) {
          // Response wasn't valid JSON
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
                  <Image
                    className="item-image"
                    src={'/images/' + item.image}  // Reference via file path
                    alt={item.name || "Menu item image"} // Fixed alt attribute - ensure fallback
                    width={200}
                    height={150}
                    objectFit="cover"
                  />
                ) : (
                  <div className="placeholder-image">
                    <Image 
                      src="/images/placeholder-food.png" 
                      alt="No image available" // Added alt attribute
                      width={200}
                      height={150}
                    />
                  </div>
                )}
              </div>

              <div className="item-details">
                <h2>{item.name}</h2>
                {/* Safeguard against undefined or invalid prices */}
                <p className="price">
                  ${item.price && !isNaN(item.price) ? item.price.toFixed(2) : 'N/A'}
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
