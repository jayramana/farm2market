import React, { use, useEffect, useState } from "react";
import { useFtm } from "../store/useFtm";

const Cart = () => {
  const { currSelected, test_products } = useFtm();
  const [temp, setTemp] = useState(1); // Trigger re render

  const addQuantity = (id: number) => {
    const arr = test_products[id];
    arr[0].selected_quantity = arr[0].selected_quantity + 1;
    arr[0].final_price = arr[0].prod_price * arr[0].selected_quantity;

    setTemp(arr[0].selected_quantity);
  };
  const subQuantity = (id: number) => {
    const arr = test_products[id];
    const val = arr[0].selected_quantity;
    const price = arr[0].final_price;
    if (val > 0) {
      arr[0].selected_quantity = val - 1;
      arr[0].final_price = price - arr[0].prod_price;
    }

    setTemp(arr[0].selected_quantity);
  };
  return (
    <main className="flex flex-col gap-4 pl-10 h-screen pt-10">
      <div className="w-[50%] grid grid-cols-1">
        {currSelected.map((item) =>
          test_products[item].map((prod) => (
            <div key={prod.prod_id} className="border-2 border-solid">
              <p>{prod.prod_name}</p>
              <p>Rs.{prod.prod_price}</p>
              <p>{prod.prod_description}</p>
              <div className="flex gap-2">
                <button onClick={() => subQuantity(prod.prod_id)}>-</button>
                <p>{prod.selected_quantity}</p>
                <button onClick={()=> addQuantity(prod.prod_id)}>+</button>
              </div>
              <p>{Math.round(prod.final_price * 100)/100}</p>
            </div>
          ))
        )}
      </div>
      <button type="button" className=" w-fit px-4 py-2 bg-black text-white rounded-md">Confirm Order</button>
    </main>
  );
};

export default Cart;
