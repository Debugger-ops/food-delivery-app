// File: src/components/orders/OrderCard.jsx
import React from 'react';
import { dbTimeForHuman } from '@/libs/dateandtime';
import './OrderCard.css'; // Optional, you can style it separately

export default function OrderCard({ order, isProcessing, onCompletePayment }) {
  if (!order) return null;

  const {
    _id,
    paid,
    createdAt,
    userName,
    userEmail,
    cartProducts = [],
    totalAmount,
  } = order;

  return (
    <div className={`order-card ${paid ? 'paid' : 'unpaid'}`}>
      <div className="order-header">
        <h3>Order #{_id?.slice(-6)}</h3>
        <span className={`status-badge ${paid ? 'paid' : 'pending'}`}>
          {paid ? 'Paid' : 'Pending'}
        </span>
      </div>

      <div className="order-details">
        <p><strong>Name:</strong> {userName || 'Unknown'}</p>
        <p><strong>Email:</strong> {userEmail || 'N/A'}</p>
        <p><strong>Date:</strong> {dbTimeForHuman(createdAt)}</p>
        <p><strong>Items:</strong></p>
        <ul className="order-items">
          {cartProducts.map((item, idx) => (
            <li key={idx}>
              {item.name} x{item.quantity || 1}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> ₹{totalAmount?.toFixed(2) || '0.00'}</p>
      </div>

      {!paid && (
        <div className="order-actions">
          <button
            className="pay-button"
            onClick={onCompletePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </button>
        </div>
      )}
    </div>
  );
}
