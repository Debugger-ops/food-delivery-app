import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import './cartproduct.css';

export default function CartProduct({
  product,
  onRemove,
  index,
  onIncreaseQty,
  onDecreaseQty
}) {
  const { image, name, size, extras, quantity = 1 } = product;

  const calculatedPrice = cartProductPrice(product);

  return (
    <div className="cart-product-container">
      <div className="cart-product-image">
        <img
          width={90}
          height={80}
          src={image || "/placeholder.jpg"}
          alt={name || "Product Image"}
        />
      </div>

      <div className="cart-product-info">
        <h3 className="product-name">{name || "Unnamed Item"}</h3>

        {size?.name && (
          <div className="product-size">
            Size: <span>{size.name}</span>
          </div>
        )}

        {extras?.length > 0 && (
          <div className="product-extras">
            {extras.map((extra, i) => (
              <div key={i}>
                {extra.name} ₹{Number(extra.price).toFixed(2)}
              </div>
            ))}
          </div>
        )}

        <div className="product-quantity">
          Quantity:
          <button onClick={() => onDecreaseQty(index)} disabled={quantity <= 1}>−</button>
          <span>{quantity}</span>
          <button onClick={() => onIncreaseQty(index)}>+</button>
        </div>
      </div>

      <div className="cart-product-price">
        <p className="price-tag">Price: ₹{calculatedPrice.toFixed(2)}</p>

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
