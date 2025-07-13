import React, { useEffect } from "react";
import { useFtm } from "../store/useFtm";

const Order = () => {
  const { id, orders, fetchOrders, loadingOrders, errorOrders } = useFtm();

  useEffect(() => {
    try {
      fetchOrders(id);
    } catch (error) {
      console.log(errorOrders);
      console.log(error);
    }
  });
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
