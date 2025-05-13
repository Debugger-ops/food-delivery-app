import { useState } from 'react';
import Image from 'next/image';
import './menuform.css'; // Import the custom CSS
import EditableImage from './EditableImage';
export default function MenuItemForm({ onSubmit, categories, isSubmitting }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: 'g' }]);
  const [sizes, setSizes] = useState([{ name: 'Regular', priceModifier: '0' }]);
  const [preparationTime, setPreparationTime] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isNonVegetarian, setIsNonVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [calories, setCalories] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // Units for ingredient measurements
  const unitOptions = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'piece', 'oz'];
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: 'g' }]);
  };
  
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  
  const handleAddSize = () => {
    setSizes([...sizes, { name: '', priceModifier: '0' }]);
  };
  
  const handleRemoveSize = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };
  
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    
    // Basic validation
    if (!name || !price || !category) {
      alert('Name, price and category are required fields');
      return;
    }
    
    // Check ingredients have at least a name
    const validIngredients = ingredients.filter(ing => ing.name.trim());
    
    // Check sizes have at least a name
    const validSizes = sizes.filter(size => size.name.trim());
    
    // Validate price is a number
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      alert('Price must be a valid number');
      return;
    }
    
    onSubmit({
      name,
      description,
      price: numericPrice,
      category,
      image,
      ingredients: validIngredients,
      sizes: validSizes,
      preparationTime: preparationTime ? parseInt(preparationTime) : null,
      dietaryInfo: {
        isVegetarian,
        isVegan,
        isGlutenFree,
        isNonVegetarian
      },
      calories: calories ? parseInt(calories) : null,
      featured
    });
  };

  // Validate price input to only allow numbers
  const handlePriceChange = (ev) => {
    const value = ev.target.value;
    // Allow only numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder="e.g. Margherita Pizza"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder="Describe your menu item..."
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.00"
                required
                inputMode="decimal"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={ev => setCategory(ev.target.value)}
                required
              >
                <option value="">Select category...</option>
                {categories?.length > 0 && categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={ev => setImage(ev.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {image && (
              <div className="image-preview">
                <img
                  src={image} 
                  alt={name} 
                  width={100} 
                  height={100}
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preparationTime">Preparation Time (minutes)</label>
              <input
                type="number"
                id="preparationTime"
                value={preparationTime}
                onChange={ev => setPreparationTime(ev.target.value)}
                min="0"
                placeholder="15"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                id="calories"
                value={calories}
                onChange={ev => setCalories(ev.target.value)}
                min="0"
                placeholder="350"
              />
            </div>
          </div>
          
          <div className="form-row dietary-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isVegetarian"
                checked={isVegetarian}
                onChange={ev => setIsVegetarian(ev.target.checked)}
              />
              <label htmlFor="isVegetarian">Vegetarian</label>
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isVegan"
                checked={isVegan}
                onChange={ev => setIsVegan(ev.target.checked)}
              />
              <label htmlFor="isVegan">Vegan</label>
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isGlutenFree"
                checked={isGlutenFree}
                onChange={ev => setIsGlutenFree(ev.target.checked)}
              />
              <label htmlFor="isGlutenFree">Gluten Free</label>
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isNonVegetarian"
                checked={isNonVegetarian}
                onChange={ev => setIsNonVegetarian(ev.target.checked)}
              />
              <label htmlFor="isNonVegetarian">Non Vegetarian</label>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <div className="ingredients-section">
            <h2>Ingredients</h2>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <div className="ingredient-name">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={ev => handleIngredientChange(index, 'name', ev.target.value)}
                    placeholder="Ingredient name"
                  />
                </div>
                
                <div className="ingredient-quantity">
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={ev => handleIngredientChange(index, 'quantity', ev.target.value)}
                    placeholder="Qty"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="ingredient-unit">
                  <select
                    value={ingredient.unit}
                    onChange={ev => handleIngredientChange(index, 'unit', ev.target.value)}
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </button>
          </div>
          
          <div className="sizes-section">
            <h2>Size Options</h2>
            
            {sizes.map((size, index) => (
              <div key={index} className="size-row">
                <div className="size-name">
                  <input
                    type="text"
                    value={size.name}
                    onChange={ev => handleSizeChange(index, 'name', ev.target.value)}
                    placeholder="Size name (e.g. Small, Large)"
                  />
                </div>
                
                <div className="size-price">
                  <div className="price-prefix">+₹</div>
                  <input
                    type="number"
                    value={size.priceModifier}
                    onChange={ev => handleSizeChange(index, 'priceModifier', ev.target.value)}
                    placeholder="Price difference"
                    step="0.01"
                  />
                </div>
                
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => handleRemoveSize(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn"
              onClick={handleAddSize}
            >
              Add Size Option
            </button>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Menu Item'}
        </button>
      </div>
    </form>
  );
}