'use client';
import { useEffect, useState } from 'react';
import './menuform.css';

export default function MenuItemForm({ onSubmit, categories, isSubmitting, menuItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: 'g' }]);
  const [sizes, setSizes] = useState([{ name: 'Regular', priceModifier: '0' }]);
  const [preparationTime, setPreparationTime] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isNonVegetarian, setIsNonVegetarian] = useState(false);
  const [calories, setCalories] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (menuItem) {
      setName(menuItem.name || '');
      setDescription(menuItem.description || '');
      setPrice(menuItem.price?.toString() || '');
      setCategory(menuItem.category || '');
      setImage(menuItem.image || '');
      setIngredients(menuItem.ingredients || [{ name: '', quantity: '', unit: 'g' }]);
      setSizes(menuItem.sizes || [{ name: 'Regular', priceModifier: '0' }]);
      setPreparationTime(menuItem.preparationTime?.toString() || '');
      setIsVegetarian(menuItem.dietaryInfo?.isVegetarian || false);
      setIsVegan(menuItem.dietaryInfo?.isVegan || false);
      setIsGlutenFree(menuItem.dietaryInfo?.isGlutenFree || false);
      setIsNonVegetarian(menuItem.dietaryInfo?.isNonVegetarian || false);
      setCalories(menuItem.calories?.toString() || '');
      setFeatured(menuItem.featured || false);
    }
  }, [menuItem]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const data = {
      name,
      description,
      price: parseFloat(price),
      category,
      image,
      ingredients,
      sizes,
      preparationTime: parseInt(preparationTime),
      dietaryInfo: {
        isVegetarian,
        isVegan,
        isGlutenFree,
        isNonVegetarian,
      },
      calories: parseInt(calories),
      featured,
    };

    onSubmit(data);
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <label className="form-label">Item Name</label>
      <input 
        className="form-input"
        type="text" 
        value={name} 
        onChange={(ev) => setName(ev.target.value)} 
        placeholder="Pizza name" 
        required 
      />

      <label className="form-label">Description</label>
      <textarea 
        className="form-textarea"
        value={description} 
        onChange={(ev) => setDescription(ev.target.value)} 
        placeholder="Item description" 
      />

      <label className="form-label">Price</label>
      <input 
        className="form-input"
        type="number" 
        value={price} 
        onChange={(ev) => setPrice(ev.target.value)} 
        placeholder="₹ Price" 
        required 
      />

      <label className="form-label">Category</label>
      <select 
        className="form-select"
        value={category} 
        onChange={(ev) => setCategory(ev.target.value)} 
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <label className="form-label">Image URL</label>
      <input 
        className="form-input"
        type="text" 
        value={image} 
        onChange={(ev) => setImage(ev.target.value)} 
        placeholder="Image URL" 
      />

      <label className="form-label">Preparation Time (in minutes)</label>
      <input 
        className="form-input"
        type="number" 
        value={preparationTime} 
        onChange={(ev) => setPreparationTime(ev.target.value)} 
      />

      <label className="form-label">Calories</label>
      <input 
        className="form-input"
        type="number" 
        value={calories} 
        onChange={(ev) => setCalories(ev.target.value)} 
      />

      <label className="form-label">Dietary Info</label>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input 
            className="form-checkbox"
            type="checkbox" 
            checked={isVegetarian} 
            onChange={() => setIsVegetarian(!isVegetarian)} 
          /> 
          Vegetarian
        </label>
        <label className="checkbox-label">
          <input 
            className="form-checkbox"
            type="checkbox" 
            checked={isVegan} 
            onChange={() => setIsVegan(!isVegan)} 
          /> 
          Vegan
        </label>
        <label className="checkbox-label">
          <input 
            className="form-checkbox"
            type="checkbox" 
            checked={isGlutenFree} 
            onChange={() => setIsGlutenFree(!isGlutenFree)} 
          /> 
          Gluten Free
        </label>
        <label className="checkbox-label">
          <input 
            className="form-checkbox"
            type="checkbox" 
            checked={isNonVegetarian} 
            onChange={() => setIsNonVegetarian(!isNonVegetarian)} 
          /> 
          Non-Vegetarian
        </label>
      </div>

      <label className="featured-label">
        <input 
          className="form-checkbox"
          type="checkbox" 
          checked={featured} 
          onChange={() => setFeatured(!featured)} 
        />
        Featured Item
      </label>

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (menuItem ? 'Updating...' : 'Creating...') : (menuItem ? 'Update Menu Item' : 'Create Menu Item')}
      </button>
    </form>
  );
}