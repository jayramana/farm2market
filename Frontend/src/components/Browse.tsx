import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

const BrowseFilter: React.FC = () => {
  const { changeCurrProd, products, loadingProd, errorProd, fetchProduct } = useFtm();
  const navigate = useNavigate();

  const [data, setData] = useState<Product[]>([]);

  const [name, setName]   = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [loc, setLoc] = useState<string>("");
  
    const redirect = (id : number) => {
      changeCurrProd(id);
      navigate("/individual");
  }

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleSearch = () => {
    const maxPrice = price ? Number(price) : Infinity;

    const filtered = products.filter((prod) => {
      const matchesName = !name || prod.prod_name.toLowerCase().includes(name.toLowerCase());
      const matchesLoc   = !loc   || prod.prod_loc === loc;
      const matchesPrice = prod.prod_price <= maxPrice;
      return matchesName && matchesLoc && matchesPrice;
    });

    setData(filtered);
  };

  const toRender = data.length > 0 ? data : products;

  return (
    <main className="px-12 py-4">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a product"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-1"
        />

        <select
          value={loc}
          onChange={e => setLoc(e.target.value)}
          className="border p-1"
        >
          <option value="">All locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Goa">Goa</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-1"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </div>

      {loadingProd && <p>Loading products…</p>}
      {errorProd   && <p className="text-red-600">{errorProd}</p>}

      {toRender.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-4">
          {toRender.map((prod) => (
            <div
              key={prod.prod_id}
              className="border p-4 rounded shadow-sm"
              onClick={()=>redirect(prod.prod_id)}
            >
              <p><strong>Name:</strong> {prod.prod_name}</p>
              <p><strong>Category:</strong> {prod.prod_category}</p>
              <p><strong>Price:</strong> ₹{prod.prod_price}</p>
              <p><strong>Seller:</strong>{prod.Seller_name}</p>
              <p><strong>Location:</strong>{prod.prod_loc}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BrowseFilter;
