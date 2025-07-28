'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UserTabs from "@/components/layout/UserTabs";
import Link from 'next/link';
import './orders.css';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetchOrders();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [session, status]);

  const fetchOrders = () => {
    setLoading(true);
    setError(null);

    fetch(`/api/orders?email=${session.user.email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
      })
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        setLoading(false);
      });
  };

  const handleDelete = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    setDeletingOrderId(orderId);
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingOrderId(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="orders-page">
        
        <div className="auth-required">
          <div className="auth-icon">🔒</div>
          <h2>Authentication Required</h2>
          <p>Please log in to view your order history.</p>
          <Link href="/login" className="login-button">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <UserTabs />
      <div className="page-header">
        <h1 className="page-title">Your Orders</h1>
        <div className="orders-summary">
          <span className="orders-count">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link href="/" className="shop-now-button">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <Link href={`/orders/${order._id}`} className="order-link">
                  <h3 className="order-title">
                    Order <span className="order-id">#{order._id?.slice(-5) || 'N/A'}</span>
                  </h3>
                </Link>
                <div className="order-status">
                  <span className="status-badge confirmed">Confirmed</span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-total">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount">₹{order.totalAmount || 'N/A'}</span>
                </div>

                <div className="order-address">
                  <div className="address-icon">📍</div>
                  <div className="address-text">
                    <span className="address-label">Delivery to:</span>
                    <span className="address-value">
                      {order.address?.address ? `${order.address.address}, ${order.address.city}` : 'Address not available'}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  <div className="items-icon">🛍️</div>
                  <div className="items-text">
                    <span className="items-label">Items:</span>
                    <div className="items-list">
                      {Array.isArray(order.cartProducts) && order.cartProducts.length > 0 ? (
                        <div className="items-preview">
                          {order.cartProducts.slice(0, 2).map((item, index) => (
  <div key={index} className="item-preview-with-image">
    <img
      src={item.image}
      alt={item.name}
      className="item-thumbnail"
    />
    <span>{item.name} × {item.quantity}</span>
  </div>
))}

                          {order.cartProducts.length > 2 && (
                            <span className="more-items">
                              +{order.cartProducts.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="no-items">No items available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-card-footer">
                <Link href={`/orders/${order._id}`} className="view-details-button">
                  View Details <span className="button-arrow">→</span>
                </Link>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="delete-button"
                  disabled={deletingOrderId === order._id}
                >
                  {deletingOrderId === order._id ? 'Deleting...' : 'Delete Order'}
                </button>
                <div className="order-date">
                  <span className="date-text">Recent order</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
