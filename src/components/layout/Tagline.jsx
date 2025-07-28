"use client";
import React, { useState, useEffect } from "react";
import "./tagline.css";

export default function Tagline() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      heading: "A Taste of Heaven, Delivered to You.",
      text: "Indulge in delicious flavors, fresh ingredients, and fast delivery—bringing food heaven straight to your doorstep!",
      imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
      imageAlt: "Delicious gourmet meal",
    },
    {
      heading: "Fresh, Fast, and Flavorful.",
      text: "Experience culinary excellence with every order, crafted with care and delivered with speed.",
      imageUrl: "https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop.jpg",
      imageAlt: "Fresh ingredients being prepared",
    },
    {
      heading: "Good Food, Great Moments",
      text: "Bringing you heartwarming meals that make every bite a moment to remember.",
      imageUrl: "https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_s3/image/601046e74a46755e44641fc2-e2968f9f.jpg",
      imageAlt: "Food delivery service in action",
    },
    {
      heading: "A Taste of Happiness",
      text: "From our kitchen to your table, enjoy meals made with love and passion.",
      imageUrl: "https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_s3/image/601046e74a46755e44641fc2-e2968f9f.jpg",
      imageAlt: "Food delivery service in action",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <section className="tagline">
      <div className="carousel">
        <div className="carousel-content">
          <div className="carousel-image-container">
            <img 
              src={carouselItems[currentSlide].imageUrl} 
              alt={carouselItems[currentSlide].imageAlt}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <h1>{carouselItems[currentSlide].heading}</h1>
              <p>{carouselItems[currentSlide].text}</p>
              <div className="clbuttons">
                <button className="order-now-btn">Order Now</button>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevSlide}>
            &lt;
          </button>
          <div className="carousel-indicators">
            {carouselItems.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
