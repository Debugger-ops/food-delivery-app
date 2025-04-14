'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import HomeMenu from "@/components/layout/HomeMenu";
import './page.css';
import Tagline from "@/components/layout/Tagline";

export default function Home() {
  return (
    <>
    
      <Tagline />
      <HomeMenu />
      
      <section className="home-selection">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'Serving Joy, One Bite at a Time'}
        />
        <p className="home-selection-text">
          At GoldenBites, we believe that great food brings people together. What started as a small passion project has grown into a vibrant kitchen where every dish is made with love, fresh ingredients, and a dash of creativity. From classic favorites to bold new flavors, our menu is designed to satisfy every craving. Whether you're here for a quick snack or a hearty meal, we're here to make sure every bite counts. Come taste the difference — because at GoldenBites, food isn't just food… it's happiness on a plate.
        </p>
      </section>

      <section className="contact-section">
        <SectionHeaders
          subHeader={'Get in Touch'}
          mainHeader={'Contact Us'}
        />
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Flavor Street, Foodie District</p>
              <p>Delicious City, DC 10001</p>
            </div>
            <div className="contact-item">
              <h3>Hours</h3>
              <p>Monday - Friday: 10am - 10pm</p>
              <p>Saturday - Sunday: 11am - 11pm</p>
            </div>
            <div className="contact-item">
              <h3>Contact</h3>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@goldenbites.com</p>
            </div>
          </div>
          
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>GoldenBites</h2>
            <p>Happiness on a plate</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GoldenBites. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}