'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/dateandtime";
import Link from "next/link";
import { useEffect, useState } from "react";
import './orders.css'; // Import the CSS file

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <section className="orders-page">
      <UserTabs isAdmin={profile?.admin} />
      <div className="orders-list">
        {loadingOrders && <div>Loading orders...</div>}
        {orders?.length > 0 && orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-info">
              <div>
                <div className={`order-status ${order.paid ? 'paid' : 'not-paid'}`}>
                  {order.paid ? 'Paid' : 'Not paid'}
                </div>
              </div>
              <div className="order-details">
                <div className="order-header">
                  <div className="user-email">{order.userEmail}</div>
                  <div className="order-time">{dbTimeForHuman(order.createdAt)}</div>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
