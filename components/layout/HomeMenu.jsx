'use client';
import { useState, useEffect } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import "./menuhome.css";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  // Directly use hardcoded items (you can replace these with your own)
  useEffect(() => {
    const hardcodedItems = [
      {
        _id: "1",
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjBtYXJnaGVyaXRhfGVufDB8fDB8fHww",
        price: 9.99,
        description: "Classic cheese and tomato pizza"
      },
      {
        _id: "2",
        name: "Veg Burger",
        image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
        price: 6.49,
        description: "Crispy patty with lettuce and sauce"
      },
      {
        _id: "3",
        name: "Pasta Alfredo",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNb-2E4TRtAxpHsCpXdaxHBSsHEdX_WO-tyQ&s",
        price: 7.99,
        description: "Creamy white sauce pasta"
      },
      {
        _id: "4",
        name: "Chicken tikka masala",
        image: "https://c.ndtvimg.com/2022-07/33meqsb_chicken-tikka_625x300_08_July_22.png",
        price: 7.99,
        description: "Made with authentic spices and herbs"
      },
      {
        _id: "5",
        name: "Paneer Butter Masala",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2.jpg",
        price: 8.49,
        description: "Rich and creamy curry with paneer cubes"
      },
      {
        _id: "6",
        name: "Chole Bhature",
        image: "https://www.shutterstock.com/shutterstock/photos/2030516498/display_1500/stock-photo-chole-bhature-is-a-very-popular-dish-in-north-india-originated-from-punjab-and-its-basically-a-2030516498.jpg",
        price: 7.25,
        description: "Spicy chickpeas served with fluffy fried bread"
      },
      {
        _id: "7",
        name: "Sushi Platter",
        image: "https://www.sushijunction.com/cdn/shop/files/PremiumPartyPlatter-Veg.jpg?v=1734335753",
        price: 12.99,
        description: "Assorted sushi rolls with soy sauce and wasabi"
      },
      {
        _id: "8",
        name: "Grilled Sandwich",
        image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg",
        price: 5.49,
        description: "Toasted bread with veggies and cheese"
      },
      {
        _id: "9",
        name: "Falafel Wrap",
        image: "https://static.toiimg.com/thumb/62708678.cms?width=1200&height=900",
        price: 6.99,
        description: "Middle Eastern wrap with falafel, veggies, and tahini"
      },
      {
        _id: "10",
        name: "Chocolate Brownie",
        image: "https://i0.wp.com/cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe.png?fit=1080%2C1080&ssl=1",
        price: 4.25,
        description: "Rich chocolate brownie with gooey center"
      },
      {
        _id: "11",
        name: "Caesar Salad",
        image: "https://static01.nyt.com/images/2024/09/10/multimedia/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb-mediumSquareAt3X.jpg",
        price: 6.75,
        description: "Fresh romaine lettuce with Caesar dressing and croutons"
      },
      {
        _id: "12",
        name: "Mango Lassi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFuB33vfZ-OPmKGIe5H-XJ5x0pgSnk5jqGw&s",
        price: 3.50,
        description: "Refreshing yogurt-based mango drink"
      }
      
    ];

    setBestSellers(hardcodedItems);
  }, []);

  return (
    <section className="home-menu">
      <div className="decorative-images">
        <img className="decorative-left" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} />
        <img className="decorative-right" src="https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg?w=826" width={200} />
      </div>

      <div className="menu-header">
        <SectionHeaders 
          subHeader="Check out" 
          mainHeader="Our Best Selling Menu" 
        />
      </div>
      

      <div className="menu-grid">
        {bestSellers.length > 0 && 
          bestSellers.map(item => (
            <MenuItem key={item._id} {...item} />
          ))
        }
      </div>
    </section>
  );
}
