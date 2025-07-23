import AddToCartButton from "./AddToCartButton";
import "./menuitemtile.css";

export default function MenuItemTile({ onAddToCart, image, description, name, basePrice, sizes, extraIngredientPrices }) {
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

  
  // Use the provided image URL or fallback to a default one if not provided
  return (
    <div className="menu-tile">
      <div className="image-container">
        <img
          src={image || "/placeholder.jpg"}  // Ensure the image exists in the public directory
          className="menu-image"
          onClick={onAddToCart}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Fallback if image doesn't load
          alt={name || "Menu Item Image"}  // Alt text for better accessibility
        />

        <div className="menu-item-name-overlay">
          <h4 className="menu-title">{name}</h4>
        </div>
      </div>
      
    </div>
  );
}
