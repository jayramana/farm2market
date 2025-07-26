import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { Product } from "../types/product";

const BrowseviaSellers = () => {
  const { currSeller, products, fetchProduct } = useFtm();
  const [currSel, setcurrSel] = useState<Product[]>();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    const fetchData = () => {
      const arr = products.filter((prod) => prod.Seller_name === currSeller);
      setcurrSel(arr);
    };
    fetchData();
  }, [currSeller, products]);

  return (
    <main className="flex flex-col gap-8">
      {currSel ? (
        currSel.map((prod, ind) => (
          <div key={ind}>
            <p>Name : {prod.prod_name}</p>
            <p>Category : {prod.prod_category}</p>
            <p>Price : {prod.prod_price}</p>
            <p>Remaining Quantity : {prod.prod_quantity}</p>
            <p>Seller Name : {prod.Seller_name}</p>
          </div>
        ))
      ) : (
        <p>Null</p>
      )}
    </main>
  );
};

export default BrowseviaSellers;
