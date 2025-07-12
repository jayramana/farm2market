import React from "react";
import { useFtm } from "../store/useFtm";

const Order = () => {
  const { orders, fetchOrders, loadingOrders, errorOrders } = useFtm();
  return (
    <div>
      {!loadingOrders ? (
        <div>
          {orders.map((ord, ind) => (
            <div key={ind}>
              <p>{ord.prod_id}</p>
              <p>{ord.final_price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Order;
