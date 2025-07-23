import React, { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "./menuitem.css";

export default function MenuItem(props) {
  const {
    image, name, description, basePrice, price,
    sizes, extraIngredientPrices,
  } = props;


  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    const hasOptions = (sizes?.length > 0) || (extraIngredientPrices?.length > 0);
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart({...props, selectedSize,  quantity: 1});
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowPopup(false);
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev =>
        prev.filter(e => e.name !== extraThing.name)
      );
    }
  }

  let selectedPrice = Number(basePrice) || 0;
  if (selectedSize) selectedPrice += selectedSize.price;
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup-overlay"
            onClick={() => setShowPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popup-container"
              onClick={(ev) => ev.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="popup-scrollable">
                <img src={image} alt={name} width={300} height={200} className="popup-image" />
                <h2 className="popup-title">{name}</h2>
                <p className="popup-description">{description}</p>

                {sizes?.length > 0 && (
                  <div className="section">
                    <h3 className="section-title">Pick your size</h3>
                    {sizes.map((size) => (
                      <label key={size._id} className="option-label">
                        <input
                          type="radio"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                          name="size"
                        />
                        <p className="price-tag">Price: ₹{price}</p>


                      </label>
                    ))}
                  </div>
                )}

                {extraIngredientPrices?.length > 0 && (
                  <div className="section">
                    <h3 className="section-title">Any extras?</h3>
                    {extraIngredientPrices.map((extraThing) => (
                      <label key={extraThing._id} className="option-label">
                        <input
                          type="checkbox"
                          onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                          checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                          name={extraThing.name}
                        />
                        {extraThing.name} +${extraThing.price}
                      </label>
                    ))}
                  </div>
                )}

                <motion.button
                  className="add-to-cart-btn"
                  onClick={handleAddToCartButtonClick}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  🛒 Add to cart ₹{price}
                </motion.button>

                <button className="cancel-btn" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...props} />
    </>
  );
}
