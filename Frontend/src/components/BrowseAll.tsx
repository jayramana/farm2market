import { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";

const BrowseAll = () => {
  const [search, setSearch] = useState<string>("");
  


  const { products, loadingProd, errorProd, fetchProduct } = useFtm();

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
      } catch (error: unknown) {
        console.log(String(error) + errorProd);
      }
    };
    fetchData();
  }, [fetchProduct, errorProd]);

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
        {!loadingProd ? (
          products.map((prod, ind) => (
            <div key={ind} className="border-2 border-solid">
              <p>{prod.prod_name}</p>
              <p>{prod.prod_category}</p>
              <p>{prod.prod_price}</p>
            </div>
          ))
        ) : (
          <div>
            <p>Loading all Products...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BrowseAll;
