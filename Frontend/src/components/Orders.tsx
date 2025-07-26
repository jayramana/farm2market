import React, { useState, useEffect } from 'react'
import { useFtm } from '../store/useFtm'
import { Orders } from '../types/transactions'

const Order = () => {
  const { id, orders, fetchOrder, loadingOrders, errorOrders } = useFtm();
  const [allorder, setAllorder] = useState<Orders[]>([]);

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  useEffect(() => {
    if (!loadingOrders && orders && Array.isArray(orders.data)) {
      setAllorder(orders.data);
    }
  }, [orders, loadingOrders]);

  if (loadingOrders) return <p>Loading orders…</p>;
  if (errorOrders)   return <p>Error: {errorOrders}</p>;

  return (
    <div>
      {allorder.map((order, index) => (
        <div key={index}>
          <p>Buyer:  {order.buyer_name}</p>
          <p>Seller: {order.seller_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Order;
