'use client';
import { useState, useEffect, useRef } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import "./menuhome.css";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) return 4;
      if (window.innerWidth >= 900) return 4;
      if (window.innerWidth >= 600) return 4;
      return 4;
    }
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Hardcoded items
  useEffect(() => {
    const hardcodedItems = [
      {
        _id: "1",
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjBtYXJnaGVyaXRhfGVufDB8fDB8fHww",
        price: 500,
        description: "Classic cheese and tomato pizza"
      },
      {
        _id: "2",
        name: "Veg Burger",
        image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
        price: 130,
        description: "Crispy patty with lettuce and sauce"
      },
      {
        _id: "3",
        name: "Pasta Alfredo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNb-2E4TRtAxpHsCpXdaxHBSsHEdX_WO-tyQ&s",
        price: 250,
        description: "Creamy white sauce pasta"
      },
      {
        _id: "4",
        name: "Chicken tikka masala",
        image: "https://c.ndtvimg.com/2022-07/33meqsb_chicken-tikka_625x300_08_July_22.png",
        price: 330,
        description: "Made with authentic spices and herbs"
      },
      {
        _id: "5",
        name: "Paneer Butter Masala",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2.jpg",
        price: 380,
        description: "Rich and creamy curry with paneer cubes"
      },
      {
        _id: "6",
        name: "Chole Bhature",
        image: "https://www.shutterstock.com/shutterstock/photos/2030516498/display_1500/stock-photo-chole-bhature-is-a-very-popular-dish-in-north-india-originated-from-punjab-and-its-basically-a-2030516498.jpg",
        price: 180,
        description: "Spicy chickpeas served with fluffy fried bread"
      },
      {
        _id: "7",
        name: "Sushi Platter",
        image: "https://www.sushijunction.com/cdn/shop/files/PremiumPartyPlatter-Veg.jpg?v=1734335753",
        price: 450,
        description: "Assorted sushi rolls with soy sauce and wasabi"
      },
      {
        _id: "8",
        name: "Grilled Sandwich",
        image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg",
        price: 110,
        description: "Toasted bread with veggies and cheese"
      },
      {
        _id: "9",
        name: "Falafel Wrap",
        image: "https://static.toiimg.com/thumb/62708678.cms?width=1200&height=900",
        price: 120,
        description: "Middle Eastern wrap with falafel, veggies, and tahini"
      },
      {
        _id: "10",
        name: "Chocolate Brownie",
        image: "https://i0.wp.com/cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe.png?fit=1080%2C1080&ssl=1",
        price: 80,
        description: "Rich chocolate brownie with gooey center"
      },
      {
        _id: "11",
        name: "Caesar Salad",
        image: "https://static01.nyt.com/images/2024/09/10/multimedia/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb-mediumSquareAt3X.jpg",
        price: 170,
        description: "Fresh romaine lettuce with Caesar dressing and croutons"
      },
      {
        _id: "12",
        name: "Mango Lassi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFuB33vfZ-OPmKGIe5H-XJ5x0pgSnk5jqGw&s",
        price: 50,
        description: "Refreshing yogurt-based mango drink"
      }, {
        _id: "13",
        name: "Litti Choka",
        image: "https://www.secondrecipe.com/wp-content/uploads/2019/11/litti-chokha-1.jpg",
        price: 210,
        description: "Refreshing yogurt-based mango drink"
      },
      {
        _id: "14",
        name: "Masala Dosa",
        image: "https://palatesdesire.com/wp-content/uploads/2022/09/Mysore-masala-dosa-recipe@palates-desire-500x500.jpg",
        price: 350,
        description: "Refreshing yogurt-based mango drink"
      },{
        _id: "15",
        name: "RasMalai",
        image: "https://palatesdesire.com/wp-content/uploads/2022/09/Rasmalai-recipe@palates-desire.jpg",
        price: 3.50,
        description: "Refreshing yogurt-based mango drink"
      }
    ];

    setBestSellers(hardcodedItems);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && bestSellers.length < 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const maxIndex = Math.max(0, bestSellers.length - itemsPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, bestSellers.length, itemsPerView]);

  const nextSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, bestSellers.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, bestSellers.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const maxIndex = Math.max(0, bestSellers.length - itemsPerView);

  return (
    <section className="home-menu">
      <div className="decorative-images">
        <img className="decorative-left" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} alt="Decorative" />
        <img className="decorative-right" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} alt="Decorative" />
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
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `100%`
            }}
          >
            {bestSellers.map(item => (
              <div
                key={item._id}
                className="carousel-item"
                style={{ width: `${100 / itemsPerView}%` }}
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

      <div className="carousel-indicators">
        {bestSellers.length > itemsPerView && Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}