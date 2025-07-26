import { useEffect } from "react";
import { useFtm } from "../store/useFtm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { prod_categories, loadingCat, fetchCategories } = useFtm();
  const { prod_sellers, loadingSellers, fetchSellers } = useFtm();
  const { currCat, fetchCat, currSeller, fetchSeller } = useFtm();

  const navigate = useNavigate();

  const redirectCat = (name: string) => {
    fetchCat(name);
    navigate("/group-by-categories");
  };

  const redirectSeller = (name: string) => {
    fetchSeller(name);
    navigate("/group-by-topsellers");
  }

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
      <h1 className="text-3xl">Categories</h1>
      <div className="flex gap-4">
        {!loadingCat ? (
          prod_categories.map((cat,ind) => (
            <div
              key={ind}
              className="border-2 border-solid"
            >
              <div onClick={() => redirectCat(cat)}>
                <p>{cat}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Products ...</p>
        )}
      </div>
      <h1 className="text-3xl">Best Sellers</h1>
      <div className="flex gap-4">
        {!loadingSellers ? (
          prod_sellers.map((sel, ind) => (
            <div key={ind} className="border-2 border-solid">
              <div onClick={() => redirectSeller(sel)}>
                <p>{sel}</p>
              </div>
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
