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
  }, [currCat,products]);

  return (
    <main className="flex flex-col gap-8">
      {currProd
        ? currProd.map((prod, ind) => (
            <div key={ind}>
              <p>Name : {prod.prod_name}</p>
              <p>Category : {prod.prod_category}</p>
              <p>Price : {prod.prod_price}</p>
              <p>Remaining Quantity : {prod.prod_quantity}</p>
              <p>Seller Name : {prod.Seller_name}</p>
            </div>
          ))
        : <p></p>}
    </main>
  );
};

export default BrowseviaCate;
