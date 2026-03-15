'use client';
import { useState, useEffect, useRef } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import "./menuhome.css";

const MENU_ITEMS = [
  { id: "1", name: "Margherita Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?fm=jpg&q=60&w=800", price: 500, description: "Classic cheese and tomato pizza" },
  { id: "2", name: "Veg Burger", image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&auto=format&fit=crop&q=60", price: 130, description: "Crispy patty with lettuce and sauce" },
  { id: "3", name: "Pasta Alfredo", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=60", price: 250, description: "Creamy white sauce pasta" },
  { id: "4", name: "Chicken Tikka Masala", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=60", price: 330, description: "Made with authentic spices and herbs" },
  { id: "5", name: "Paneer Butter Masala", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=60", price: 380, description: "Rich and creamy curry with paneer cubes" },
  { id: "6", name: "Chole Bhature", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=60", price: 180, description: "Spicy chickpeas served with fluffy fried bread" },
  { id: "7", name: "Sushi Platter", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&auto=format&fit=crop&q=60", price: 450, description: "Assorted sushi rolls with soy sauce and wasabi" },
  { id: "8", name: "Grilled Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=60", price: 110, description: "Toasted bread with veggies and cheese" },
  { id: "9", name: "Falafel Wrap", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop&q=60", price: 120, description: "Middle Eastern wrap with falafel and tahini" },
  { id: "10", name: "Chocolate Brownie", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=60", price: 80, description: "Rich chocolate brownie with gooey center" },
  { id: "11", name: "Caesar Salad", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop&q=60", price: 170, description: "Fresh romaine with Caesar dressing and croutons" },
  { id: "12", name: "Mango Lassi", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=60", price: 50, description: "Refreshing yogurt-based mango drink" },
];

const getItemsPerView = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 900) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
};

const HomeMenu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const maxIndex = Math.max(0, MENU_ITEMS.length - itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      const next = getItemsPerView();
      setItemsPerView(next);
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, MENU_ITEMS.length - next)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  const next = useCallback(() => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1)), [maxIndex]);
  const prev = useCallback(() => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1)), [maxIndex]);

  const itemWidth = 100 / itemsPerView;

  return (
    <section className="home-menu">
      <div className="decorative-images">
        <img className="decorative-left" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} alt="" aria-hidden="true" />
        <img className="decorative-right" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} alt="" aria-hidden="true" />
      </div>

      <div className="menu-header">
        <SectionHeaders
          subHeader="Check out"
          mainHeader="Our Best Selling Menu"
        />
      </div>

      <div className="carousel-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Previous slide">
          &#8249;
        </button>

        <div className="carousel-wrapper" ref={carouselRef}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
            }}
          >
            {bestSellers.map(item => (
              <div
                key={item._id}
                className="carousel-item"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <MenuItem {...item} />
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Next slide">
          &#8250;
        </button>
      </div>

      <div className="carousel-indicators" role="tablist" aria-label="Carousel navigation">
        {bestSellers.length > itemsPerView && Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
  );
};

export default HomeMenu;