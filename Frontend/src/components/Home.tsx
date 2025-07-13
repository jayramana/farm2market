import  { useEffect } from "react";
import { useFtm } from "../store/useFtm";

const Home = () => {
  const { prod_categories, loadingCat, fetchCategories } = useFtm();
  const { prod_sellers, loadingSellers, fetchSellers } = useFtm();

  useEffect(() => {
    try {
      fetchCategories();
      fetchSellers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error in fetching datas: " + error.message);
      } else {
        throw new Error("Error in fetching datas");
      }
    }
  }, [fetchCategories, fetchSellers]);

  return (
    <div className="h-screen px-12 py-4">
      <h1>Photos</h1>
      <div className="flex gap-4">
        {!loadingCat ? (
          prod_categories.map((cat) => (
            <div
              key={prod_categories.indexOf(cat)}
              className="border-2 border-solid"
            >
              {cat}
            </div>
          ))
        ) : (
          <p>Loading Products ...</p>
        )}
      </div>
      <div className="flex gap-4">
        {!loadingSellers ? (
          prod_sellers.map((sel, ind) => (
            <div key={ind} className="border-2 border-solid">
              {sel}
            </div>
          ))
        ) : (
          <p>Loading Sellers .. </p>
        )}
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default Home;
