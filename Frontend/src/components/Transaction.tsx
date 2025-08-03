import React,{useState, useEffect} from 'react'
import { useFtm } from '../store/useFtm'
import type { Product } from '../types/product';

const Transaction = () => {
  const { currSelected, products } = useFtm();
  const [prod, setProd] = useState<Product[]>([]);

  // useEffect(() => {
  //   const updateRecords = () => {
  //     const newArr = products.filter((item)=>item.prod_id === )
  //   }
  // }, []);
  return (
    <div>{
      
    }</div>
  )
}

export default Transaction