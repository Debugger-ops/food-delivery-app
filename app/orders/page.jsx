'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import './orders.css';

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  useEffect(() => {
    if (session) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      // Sort orders by creation date (latest first)
      const sortedOrders = data.sort((a, b) => {
        const dateA = new Date(a.createdAt || a._id);
        const dateB = new Date(b.createdAt || b._id);
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cartProductPrice = (product) => {
    // Check multiple possible price fields
    const basePrice = product.price || product.basePrice || product.cost || product.amount || 0;
    const quantity = Number(product.quantity) || 1;
    
    // Debug log to see what's in the product object
    console.log('Product data:', product);
    console.log('Base price found:', basePrice);
    console.log('Quantity:', quantity);
    
    return basePrice * quantity;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (order) => {
    // You can customize this based on your order status logic
    if (order.delivered) return 'Delivered';
    if (order.shipped) return 'Shipped';
    if (order.processing) return 'Processing';
    return 'Confirmed';
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#007bff';
      case 'processing': return '#ffc107';
      case 'confirmed': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const toggleOrderExpansion = (orderIndex) => {
    setExpandedOrder(expandedOrder === orderIndex ? null : orderIndex);
  };

  const deleteOrder = async (orderId, orderIndex) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingOrder(orderId);
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Remove the order from the local state
      setOrders(prevOrders => prevOrders.filter((_, index) => index !== orderIndex));
      
      // Close expanded view if this order was expanded
      if (expandedOrder === orderIndex) {
        setExpandedOrder(null);
      }
    } catch (err) {
      alert('Error deleting order: ' + err.message);
    } finally {
      setDeletingOrder(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="orders-section">
        <h1>Your Orders</h1>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="orders-section">
        <h1>Your Orders</h1>
        <div className="error-message">
          <p>Error loading orders: {error}</p>
          <button onClick={fetchOrders} className="retry-button">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <section className="orders-section">
        <h1>Your Orders</h1>
        <p className="auth-message">Please sign in to view your orders.</p>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <div className="orders-header">
        <h1>Your Orders</h1>
        <p className="orders-count">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </p>
      </div>

      {orders.length === 0 && (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h2>No orders yet</h2>
          <p>When you place your first order, it will appear here.</p>
        </div>
      )}

      {orders.map((order, index) => {
        const subtotal = order.cartProducts?.reduce((sum, p) => {
          return sum + cartProductPrice(p);
        }, 0) || 0;

        const deliveryFee = order.deliveryFee || 0;
        const total = subtotal + deliveryFee;
        const status = getOrderStatus(order);
        const isExpanded = expandedOrder === index;

        return (
          <div key={order._id || index} className="order-card">
            <div className="order-header" onClick={() => toggleOrderExpansion(index)}>
              <div className="order-info">
                <h2>Order #{order.orderNumber || `ORD-${index + 1}`}</h2>
                <p className="order-date">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="order-meta">
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(status) }}
                >
                  {status}
                </span>
                <span className="order-total">₹{total.toFixed(2)}</span>
                <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="order-details">
                <div className="order-products">
                  <h3>Items Ordered ({order.cartProducts?.length || 0})</h3>
                  {order.cartProducts?.map((product, i) => (
                    <div key={i} className="ordered-product">
                      <div className="product-info">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                          />
                        )}
                        <div className="product-details">
                          <span className="product-name">{product.name}</span>
                          <span className="product-quantity">
                            Qty: {product.quantity || 1}
                          </span>
                        </div>
                      </div>
                      <span className="product-price">
                        ₹{cartProductPrice(product).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-line">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Delivery:</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  {order.tax && (
                    <div className="summary-line">
                      <span>Tax:</span>
                      <span>₹{order.tax.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-line total">
                    <span><strong>Total:</strong></span>
                    <span><strong>₹{total.toFixed(2)}</strong></span>
                  </div>
                </div>

                <div className="delivery-info">
                  <h3>Delivery Information</h3>
                  <div className="address">
                    <div className="address-field">
                      <strong>Phone:</strong> {order.phone || 'N/A'}
                    </div>
                    <div className="address-field">
                      <strong>Address:</strong> {order.street || 'N/A'}
                    </div>
                    <div className="address-field">
                      <strong>City:</strong> {order.city || 'N/A'}
                    </div>
                    <div className="address-field">
                      <strong>Postal Code:</strong> {order.postalCode || 'N/A'}
                    </div>
                    <div className="address-field">
                      <strong>Country:</strong> {order.country || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <button 
                    className="action-button track-order"
                    onClick={() => {/* Add tracking logic */}}
                  >
                    Track Order
                  </button>
                  <button 
                    className="action-button reorder"
                    onClick={() => {/* Add reorder logic */}}
                  >
                    Reorder
                  </button>
                  {status === 'Delivered' && (
                    <button 
                      className="action-button review"
                      onClick={() => {/* Add review logic */}}
                    >
                      Write Review
                    </button>
                  )}
                  <button 
                    className="action-button delete-order"
                    onClick={() => deleteOrder(order._id || `temp-${index}`, index)}
                    disabled={deletingOrder === (order._id || `temp-${index}`)}
                  >
                    {deletingOrder === (order._id || `temp-${index}`) ? 'Deleting...' : 'Delete Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}