import { motion } from "framer-motion";
import "./MenuCard.css";

const MenuCard = ({ name, image, price, description }) => {
  const formattedPrice = price < 10 ? `$${price.toFixed(2)}` : `₹${price}`;

  return (
    <motion.div
      className="menu-card"
      style={{ boxShadow: "var(--shadow-card)" }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-card-hover)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="menu-card__image-wrapper">
        <img
          src={image}
          alt={name}
          className="menu-card__image"
          loading="lazy"
        />
      </div>

      <div className="menu-card__body">
        <div className="menu-card__row">
          <h3 className="menu-card__name">{name}</h3>
          <span className="menu-card__price">{formattedPrice}</span>
        </div>
        <p className="menu-card__description">{description}</p>
      </div>
    </motion.div>
  );
};

export default MenuCard;