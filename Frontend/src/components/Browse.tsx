import { useState,useEffect } from "react";
import axios from "axios";
import { useFtm } from "../store/useFtm";

const Browse = () => {
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

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="number"
          name=""
          id=""
          max={100000}
          min={0}
          value={pricefilter === undefined ? "" : pricefilter}
          onChange={(e) =>
            setPricefilter(
              e.target.value === "" ? undefined : Number(e.target.value)
            )
          }
        />
        <select name="" id="" onChange={(e) => setLocation(e.target.value)}>
          <option value="">Loc</option>
          <option value="chennai">Chennai</option>
          <option value="bangalore">Bangalore</option>
          <option value="coimbatore">Coimbatore</option>
          <option value="goa">Goa</option>
          <option value="new delhi">New Delhi</option>
        </select>
      </div>

      {/* Search Results */}
      {!loadingProd ? (
        <div>
          <p>Products are being browsed... </p>
        </div>
      ) : (
        <div>
          <p>None Found</p>
        </div>
      )}
      <p>Hello Added to change this</p>
    </main>
  );
};

export default Browse;
