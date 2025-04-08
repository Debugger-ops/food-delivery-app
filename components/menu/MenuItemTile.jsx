import AddToCartButton from "./AddToCartButton";
import "./menuitemtile.css"; // Corrected file path and extension

export default function MenuItemTile({ onAddToCart, ...item }) {
  const {
    image,
    description,
    name,
    basePrice,
    sizes,
    extraIngredientPrices,
  } = item;

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="menu-tile">
      <div className="image-container">
        <img src={image} className="menu-image" alt="menu item" />
      </div>
      <h4 className="menu-title">{name}</h4>
      <p className="menu-description">
        {description}
      </p>
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
