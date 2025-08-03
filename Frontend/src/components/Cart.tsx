import React, { use, useEffect, useState } from "react";
import { useFtm } from "../store/useFtm";

const Cart = () => {
  const { currSelected, test_products } = useFtm();

  return (
    <main className="h-screen pt-10">
      <div className="grid grid-cols-4">
        {currSelected.map((item) =>
          test_products[item].map((prod) => (
            <div key={prod.prod_id} className="border-2 border-solid">
              <p>{prod.prod_name}</p>
              <p>Rs.{prod.prod_price}</p>
              <p>{prod.prod_description}</p>
            </div>
          ))
        )}
      </div>
      <p>Cart</p>
    </main>
  );
};

export default Cart;
