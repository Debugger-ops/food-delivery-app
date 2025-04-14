import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import './cartproduct.css'; // Import the custom CSS

export default function CartProduct({product, onRemove, index}) {
  return (
    <div className="cart-product-container">
      <div className="cart-product-image">
        <Image width={240} height={240} src={product.image} alt={''} />
      </div>
      <div className="cart-product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.size && (
          <div className="product-size">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="product-extras">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} ${extra.price}</div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-product-price">
        ${cartProductPrice(product)}
      </div>
      {!!onRemove && (
        <div className="remove-button">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="remove-btn">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
