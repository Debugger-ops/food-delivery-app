'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import './menupage.css';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch('/api/categories');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesRes.json();
        // Optional: sort alphabetically
        categoriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(categoriesData);

        const menuItemsRes = await fetch('/api/menu-items');
        if (!menuItemsRes.ok) throw new Error('Failed to fetch menu items');
        const menuItemsData = await menuItemsRes.json();
        setMenuItems(menuItemsData);
        
        // Set first category as default, or null for overview
        setSelectedCategory(null); // Start with overview
      } catch (err) {
        console.error('Error loading menu data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Show all categories overview
  const showAllCategories = () => {
    setSelectedCategory(null);
  };

  // Get current category details
  const currentCategory = categories.find(cat => cat._id === selectedCategory);
  
  // Get filtered menu items for selected category
  const filteredMenuItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-page-container">
      {/* Categories Sidebar */}
      <aside className="categories-sidebar">
        <h3 className="sidebar-title">Categories</h3>
        
        {/* Show All Button */}
        <button
          className={`category-nav-item show-all ${selectedCategory === null ? 'active' : ''}`}
          onClick={showAllCategories}
        >
          🏠 All Categories
        </button>

        <nav className="categories-nav">
          {categories.map(category => (
            <button
              key={category._id}
              className={`category-nav-item ${selectedCategory === category._id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
              <span className="item-count">
                ({menuItems.filter(item => item.category === category._id).length})
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Menu Content */}
      <section className="menu-page">
        {loading ? (
          <div className="loading">Loading menu...</div>
        ) : selectedCategory === null ? (
          // Show all categories overview
          <div className="categories-overview">
            <div className="overview-header">
              <SectionHeaders mainHeader="Our Menu" />
              <p className="overview-subtitle">Choose a category to explore our delicious offerings</p>
            </div>
            <div className="categories-grid">
              {categories.map(category => (
                <div
                  key={category._id}
                  className="category-card"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <h3 className="category-card-title">{category.name}</h3>
                  <p className="category-card-description">
                    {menuItems.filter(item => item.category === category._id).length} items available
                  </p>
                  <button className="category-card-button">
                    View Menu →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show selected category
          <div className="category-view">
            <div className="category-header">
              <SectionHeaders mainHeader={currentCategory?.name || 'Menu'} />
              <p className="category-subtitle">
                {filteredMenuItems.length} delicious items in this category
              </p>
            </div>
            
            {filteredMenuItems.length === 0 ? (
              <div className="empty-category">
                <p>No items found in this category.</p>
              </div>
            ) : (
              <div className="menu-grid">
                {filteredMenuItems.map(item => (
                  <MenuItem key={item._id} {...item} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}