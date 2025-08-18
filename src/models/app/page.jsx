'use client';

import { useState, useEffect } from 'react';
import "./page.css"
import SectionHeaders from "@/components/layout/SectionHeaders";
import HomeMenu from "@/components/layout/HomeMenu";
import Tagline from "@/components/layout/Tagline";
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  Users, 
  Award, 
  Heart,
  ArrowUp,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Stats data
  const stats = [
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Award, number: "500+", label: "Dishes Served Daily" },
    { icon: Star, number: "4.9", label: "Average Rating" },
    { icon: Heart, number: "15+", label: "Years of Experience" }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely amazing food! The flavors are incredible and the service is top-notch. I've been coming here for years and it never disappoints.",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Best restaurant in the city! The ambiance is perfect for date nights and the food quality is consistently excellent.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "GoldenBites has become our family's go-to place. The staff remembers our orders and makes us feel like we're part of their family.",
      avatar: "ER"
    }
  ];

  // Features data
  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Hot food delivered to your door in 30 minutes or less"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the finest ingredients sourced from local farms"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with passion and attention to detail"
    },
    
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Form handling
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Tagline />
      <HomeMenu />

      {/* Hero Stats Section */}
      <section className="stats-section" id="stats" data-animate>
        <div className="container">
          <div className={`stats-grid ${isVisible.stats ? 'animate-in' : ''}`}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">
                  <stat.icon size={32} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" data-animate>
        <div className="container">
          <SectionHeaders
            subHeader={'Why Choose Us'}
            mainHeader={'What Makes Us Special'}
          />
          <div className={`features-grid ${isVisible.features ? 'animate-in' : ''}`}>
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="feature-icon">
                  <feature.icon size={40} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-selection" id="about" data-animate>
        <div className="container">
          <SectionHeaders
            subHeader={'Our Story'}
            mainHeader={'Serving Joy, One Bite at a Time'}
          />
          <div className={`about-content ${isVisible.about ? 'animate-in' : ''}`}>
            <div className="about-text">
              <p className="home-selection-text">
                At GoldenBites, we believe that great food brings people together. What started as a small passion project has grown into a vibrant kitchen where every dish is made with love, fresh ingredients, and a dash of creativity. From classic favorites to bold new flavors, our menu is designed to satisfy every craving.
              </p>
              <p className="home-selection-text">
                Whether you're here for a quick snack or a hearty meal, we're here to make sure every bite counts. Come taste the difference — because at GoldenBites, food isn't just food… it's happiness on a plate.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <CheckCircle className="highlight-icon" />
                  <span>Fresh ingredients sourced daily</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle className="highlight-icon" />
                  <span>Award-winning recipes</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle className="highlight-icon" />
                  <span>Exceptional customer service</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <Heart size={64} />
                <span>Cooking with Passion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials" data-animate>
        <div className="container">
          <SectionHeaders
            subHeader={'Customer Reviews'}
            mainHeader={'What Our Customers Say'}
          />
          <div className={`testimonials-carousel ${isVisible.testimonials ? 'animate-in' : ''}`}>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="star-filled" size={20} />
                  ))}
                </div>
                <p>"{testimonials[currentTestimonial].text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <span>{testimonials[currentTestimonial].name}</span>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact" data-animate>
        <div className="container">
          <SectionHeaders
            subHeader={'Get in Touch'}
            mainHeader={'Contact Us'}
          />
          <div className={`contact-content ${isVisible.contact ? 'animate-in' : ''}`}>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>Address</h3>
                  <p>123 Flavor Street, Foodie District</p>
                  <p>Delicious City, DC 10001</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={24} />
                </div>
                <div>
                  <h3>Hours</h3>
                  <p>Monday - Friday: 10am - 10pm</p>
                  <p>Saturday - Sunday: 11am - 11pm</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h3>Contact</h3>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: hello@goldenbites.com</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send us a message</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`submit-btn ${formStatus}`}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 
                   formStatus === 'success' ? 'Message Sent!' : 
                   <>Send Message <Send size={16} /></>}
                </button>
                {formStatus === 'success' && (
                  <p className="success-message">Thank you! We'll get back to you soon.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest updates and special offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>GoldenBites</h2>
              <p>Happiness on a plate</p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
              </div>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Dine In</a></li>
                <li><a href="#">Takeaway</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Catering</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Info</h3>
              <p><MapPin size={16} /> 123 Flavor Street, DC 10001</p>
              <p><Phone size={16} /> (555) 123-4567</p>
              <p><Mail size={16} /> hello@goldenbites.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} GoldenBites. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}