import React, { useState, useEffect } from 'react'
import { useFtm } from '../store/useFtm'
import { Product } from '../types/product';

const IndividualProduct = () => {
    const { currView, products, loadingProd, errorProd, fetchProduct } = useFtm();
    const [currProd, setCurrprod] = useState<Product[]>([])
    
    useEffect(() => {
        fetchProduct();
    }, [currView, fetchProduct]);

  useEffect(() => {
    const setProduct = () => {
      const arr = products.filter((prod) => prod.prod_id === currView);
      setCurrprod(arr);
    }
      
    setProduct();
  }, [currView, products]);

  return (
      <main>
      {currView > 0 && currProd ? currProd.map((prod, ind) => (
        <div key={ind}>
          <p>Name : {prod.prod_name}</p>
          <p>Category : {prod.prod_category}</p>
          <p>Price : {prod.prod_price}</p>
          <p>Remaining Quantity : {prod.prod_quantity}</p>
          <p>Seller : {prod.Seller_name}</p>
        </div>
      )) : (<p>No Products Found</p>)}
    </main>
  )
}

export default IndividualProduct