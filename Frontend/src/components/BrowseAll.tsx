import { useState,useEffect } from "react";
import axios from "axios";
import { useFtm } from "../store/useFtm";

const BrowseAll = () => {
  const [search, setSearch] = useState<string>("");
  const [pricefilter, setPricefilter] = useState<number>();
  const [location, setLocation] = useState<string>();
  const [currloc, setCurrloc] = useState<string>();

  const {products,loadingProd,errorProd,fetchProduct} = useFtm()

  const searchButton = () => {
    if (search.length > 0) {
      console.log(search);
    } else {
      console.log("No products found");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchProduct();
      } catch (error) {
        console.log(error)
      
      }
    }
    fetchData()
  },[fetchProduct])

  return (
    <main className="h-screen px-12 py-4">
      {/* Search */}
      <div className="flex gap-2">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={searchButton}>
          Search
        </button>
      </div>

      <div className="flex gap-2">
        {products.map((prod, ind) => (
          <div key={ind} className="border-2 border-solid">
            <p>{prod.prod_name}</p>
            <p>{prod.prod_category}</p>
            <p>{prod.prod_price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrowseAll;