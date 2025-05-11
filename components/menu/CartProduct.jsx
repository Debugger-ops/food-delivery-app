import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import './cartproduct.css'; // Custom CSS

export default function CartProduct({ product, onRemove, index }) {
  const { image, name, size, extras, price } = product;
  // Debugging output
  console.log("Cart product:", product);

  return (
    <div className="cart-product-container">
      <div className="cart-product-image">
        <img
          width={90}
          height={80}
          src={product.image || "/placeholder.jpg"}
          alt={product.name || "Product Image"}
        />
      </div>

      <div className="cart-product-info">
        <h3 className="product-name">{product.name || "Unnamed Item"}</h3>

        {product.size?.name && (
          <div className="product-size">
            Size: <span>{product.size.name}</span>
          </div>
        )}

        {product.extras?.length > 0 && (
          <div className="product-extras">
            {product.extras.map((extra, i) => (
              <div key={i}>
                {extra.name} ${Number(extra.price).toFixed(2)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-product-price">
      <p className="price-tag">Price: ₹{price}</p>
      </div>

      {!!onRemove && (
        <div className="remove-button">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="remove-btn"
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
