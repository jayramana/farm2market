import { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { Wishlist } from "../types/product";
import axios from "axios";

const WishList = () => {
  const { id, users } = useFtm();
  const [list, setList] = useState<Wishlist[]>([]);

  useEffect(() => {
    const retrieve_Items = async () => {
      const data = await axios.get(
        `http://localhost:3000/api/f2m/user/wishlist/${id}`
      );
      setList(data.data.data);
    };
    retrieve_Items();
  }, [id]);

  const delete_item = async(id: number) => {
    try {
      const data = await axios.delete(`http://localhost:3000/api/f2m/user/wishlist/delete/${id}`)
      console.log(data)
      setList((prev)=> prev.filter((item)=> item.wishlist_id != id))
    } catch (error) {
      console.log(error)
    }
  }

  const delete_All = async() => {
    try {
      const data = await axios.delete(`http://localhost:3000/api/f2m/user/wishlist/deleteAll/${id}`);
      setList([])
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="px-12 py-4">
      <div className="flex justify-between">
        <p>{users.user_name}'s WishList</p>
        <div className="flex gap-4">
          <button>
            <p>Add Items</p>
          </button>
          <button onClick={() => delete_All()}>
            <p>Delete all items</p>
          </button>
        </div>
      </div>

      <div>
        <p>{list?.length} items</p>
        <div className="flex flex-col gap-4">
          {list.map((li) => (
            <div key={li.wishlist_id} className="border-b-2 border-b-black">
              <p>{li.prod_name}</p>
              <p>{li.prod_price}</p>
              <p>{li.prod_category}</p>
              <p>{li.Seller_name}</p>
              <p>{li.created_at instanceof Date ? li.created_at.toLocaleString() : li.created_at}</p>
              <button className="bg-red-500 text-white px-2 py-1 rounded-lg" onClick={() => delete_item(li.wishlist_id)}>Delete Item</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WishList;
