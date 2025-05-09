'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/dateandtime";
import Link from "next/link";
import { useEffect, useState } from "react";
import './orders.css'; // Import the CSS file

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('order'));
    if (storedOrder) {
      setOrders([storedOrder]); // Make sure it's an array if only one order is stored
    }
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await res.json();
      console.log('Fetched orders:', data); // Debugging line
      if (Array.isArray(data)) {
        setOrders(data.reverse());
      } else {
        setOrders([]); // If data is not an array, set orders to an empty array
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingOrders(false);
    }
  }

  // Function to handle completing the checkout and marking the order as paid
  async function completeCheckout(orderId) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paid: true }), // Mark as paid
      });

      if (!res.ok) {
        throw new Error('Failed to update order');
      }

      const updatedOrder = await res.json();
          console.log('Updated order:', updatedOrder); // Log the updated order to check


      // Update the order status in the current state without needing to refetch
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <section className="orders-page">
      <UserTabs /> {/* Removed isAdmin prop */}
      <div className="orders-list">
        {loadingOrders && <div>Loading orders...</div>}
        {error && <div className="error-message">Error: {error}</div>}
        {orders?.length > 0 ? (
          orders.map(order => (
            <div key={order._id || `${order.createdAt}-${Math.random()}`} className="order-card">
              <div className="order-info">
                <div>
                  <div className={`order-status ${order.paid ? 'paid' : 'not-paid'}`}>
                    {order.paid ? 'Paid' : 'Not paid'}
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-header">
                    <div className="user-email">{order.userEmail}</div>
                    <div className="order-time">{order.createdAt ? dbTimeForHuman(order.createdAt):'Invalid Date'}</div>
                  </div>
                  <div className="order-products">
                    {order.cartProducts.map(p => p.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="order-actions">
                <Link href={`/orders/${order._id}`} className="order-button">
                  Show order
                </Link>
                {!order.paid && (
                  <button onClick={() => completeCheckout(order._id)} className="checkout-button">
                    Complete Checkout
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No orders available.</div>
        )}
      </div>
    </section>
  );
}
