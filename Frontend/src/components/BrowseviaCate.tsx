import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { Product } from "../types/product";

const BrowseviaCate = () => {
  const { currCat, products, fetchProduct } = useFtm();
  const [currProd, setCurrProd] = useState<Product[]>();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    const fetchData = () => {
      const arr = products.filter(
        (prod) => prod.prod_category.toLowerCase() === currCat.toLowerCase()
      );
      setCurrProd(arr);
    };
    fetchData();
  }, [currCat, products]);

  return (
    <main className="grid grid-cols-4 gap-4 px-12 py-4">
      {currProd ? (
        currProd.map((prod, ind) => (
          <div key={ind} className="border-2 border-solid px-8 py-4">
            <p>Name : {prod.prod_name}</p>
            <p>Category : {prod.prod_category}</p>
            <p>Price : {prod.prod_price}</p>
            <p>Remaining Quantity : {prod.prod_quantity}</p>
            <p>Seller Name : {prod.Seller_name}</p>
            <div className="flex gap-2">
              <button className="border-2 border-solid px-2 py-1">Wishlist</button>
              <button className="border-2 border-solid px-2 py-1">Add to Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </main>
  );
};

export default BrowseviaCate;
