import { motion, useAnimation } from 'framer-motion';
import { useCallback } from 'react';
import './addtocartbutton.css';

export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice
}) {
  const controls = useAnimation();

  const handleClick = useCallback(() => {
    // Animate on click
    controls.start({
      scale: [1, 1.1, 0.95, 1],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });

    // Trigger any external logic
    onClick();
  }, [controls, onClick]);

  const buttonLabel = hasSizesOrExtras
    ? `🛒 Add to cart `
    : `🛒 Add to cart `;

  const buttonClass = hasSizesOrExtras ? 'custom-cart-button' : 'plain-cart-button';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`cart-button-base ${buttonClass}`}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{buttonLabel}</span>
    </motion.button>
  );
}
