'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import './menupage.css';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error('Error loading menu data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="menu-page">
      {loading ? (
        <div className="loading">Loading menu...</div>
      ) : categories.length === 0 ? (
        <p className="empty-message">No categories found.</p>
      ) : (
        categories.map(c => (
          <div key={c._id} className="category-section">
            <div className="section-header">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="menu-grid">
              {menuItems
                .filter(item => item.category === c._id)
                .map(item => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
