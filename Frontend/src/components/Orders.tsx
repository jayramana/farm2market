import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { Transactions } from "../types/transactions";

const Order = () => {
  const { id, orders, fetchOrder, loadingOrders, errorOrders } = useFtm();
  const [allorder, setAllorder] = useState<Transactions[]>([]);

  // Convert date from Database to readable Dates
  const date_string_conversion = (date: string) => {
    const new_date = new Date(date).toISOString().split("T")[0];
    console.log(new_date);
    return new_date;
  };

  // Create a new HashMap that groups all items by dates they were ordered
  const groupDates = allorder.reduce(
    (groups: Record<string, Transactions[]>, item: Transactions) => {
      const date_Key = date_string_conversion(item.transaction_date);

      if (!groups[date_Key]) {
        groups[date_Key] = [];
      }

      groups[date_Key].push(item);

      return groups;
    },
    {} as Record<string, Transactions[]>
  );

  // Sort the Keys
  const grouped_by_Date = Object.entries(groupDates).sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  useEffect(() => {
    if (!loadingOrders && orders && Array.isArray(orders.data)) {
      setAllorder(orders.data);
    }
  }, [orders, loadingOrders]);

  console.log(allorder);

  if (loadingOrders) return <p>Loading orders…</p>;
  if (errorOrders) return <p>Error: {errorOrders}</p>;

  return (
    // <div>
    //   {allorder.map((order, index) => (
    //     <div key={index}>
    //       <p>Buyer: {order.buyer_name}</p>
    //       <p>Seller: {order.seller_name}</p>
    //     </div>
    //   ))}
    // </div>

    <main className="px-4 py-2">
      <p>Orders</p>
      <div className="flex flex-col gap-4 px-10 py-4">
        {grouped_by_Date.map(([date, items]) => (
          <div key={date}>
            <p>{date}</p>
            {items.map((item: Transactions) => (
              <div>
                <p>Buyer Name : {item.buyer_name}</p>
                <p>Seller Name : {item.seller_name}</p>
                <p>Product Name : {item.prod_name}</p>
                <p>Product Price : {item.prod_price}</p>
                <p>Final Price : {item.final_price}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Order;
