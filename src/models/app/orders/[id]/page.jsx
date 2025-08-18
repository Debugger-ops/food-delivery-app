"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../orderid.css';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        fetch(`/api/orders?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching order:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="error-container">
                <h2>Order Not Found</h2>
                <p>The order you're looking for doesn't exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="order-details">
            <div className="order-header">
                <h2 className="order-title">
                    Order
                    <span className="order-id">#{order._id?.slice(-5) || 'N/A'}</span>
                </h2>
                <div className="order-status">
                    <span className="status-badge">Confirmed</span>
                </div>
            </div>

            <div className="total-amount">
                <strong>Total Amount:</strong> ₹{order.totalAmount ?? 'N/A'}
            </div>

            <div className="section address-section">
                <h3 className="section-header">
                    <span className="section-icon">📍</span>
                    Delivery Address
                </h3>
                <div className="address-info">
                    {order.address ? (
                        <>
                            <p className="street">{order.address.address}</p>
                            <p className="city-postal">{order.address.city}, {order.address.postalCode}</p>
                            <p className="country">{order.address.country}</p>
                            <p className="phone">Phone: {order.address.phone}</p>
                        </>
                    ) : (
                        <p className="no-data">No address information available</p>
                    )}
                </div>
            </div>

            <div className="section items-section">
                <h3 className="section-header">
                    <span className="section-icon">🛍️</span>
                    Order Items
                    <span className="items-count">
                       ({order.cartProducts?.length || 0} {order.cartProducts?.length === 1 ? 'item' : 'items'})

                    </span>
                </h3>
                <div className="items-container">
                    {order.cartProducts?.length > 0 ? (
                        <ul className="items-list">
                            {order.cartProducts.map((item, index) => (
                                <li key={index} className="item">
                                    <div className="item-info">
                                        <img
                                            src={item.image || '/placeholder.png'}
                                            alt={item.name}
                                            className="item-image"
                                        />
                                        <div className="item-details">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                    </div>

                                    <div className="item-pricing">
                                        <span className="item-unit-price">₹{item.price} each</span>
                                        <span className="item-total-price">₹{item.price * item.quantity}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-data">No items found in this order</p>
                    )}
                </div>
            </div>

            <div className="order-summary">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{order.totalAmount ?? 'N/A'}</span>
                </div>
                <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>₹{order.totalAmount ?? 'N/A'}</span>
                </div>
            </div>
        </div>
    );
}