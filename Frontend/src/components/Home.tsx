import { useState, useEffect, useCallback } from "react";
import { useFtm } from "../store/useFtm";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const { prod_categories, loadingCat, fetchCategories } = useFtm();
  const { prod_sellers, loadingSellers, fetchSellers } = useFtm();
  const { currCat, fetchCat, currSeller, fetchSeller } = useFtm();
  const { id } = useFtm();

  const images = ["/home1.jpeg", "/home2.jpeg", "/home3.jpeg"];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Auto slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current, nextSlide]);

  const navigate = useNavigate();

  const redirectCat = (name: string) => {
    fetchCat(name);
    navigate("/group-by-categories");
  };

  const redirectSeller = (name: string) => {
    fetchSeller(name);
    navigate("/group-by-topsellers");
  };

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
    <div className="h-screen px-12 py-4 flex flex-col gap-8">
      {/* Photo slider */}
      {id > 0 ? (
        <>
          <div className="flex justify-center">
            <div className="relative w-3/4 h-[500px] overflow-hidden rounded-2xl shadow-lg">
              {/* Images */}
              <div
                className="flex transition-transform ease-out duration-500 h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`slide-${index}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Left button */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right button */}
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full ${
                      current === index ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <h1 className="text-3xl">Categories</h1>
          <div className="flex gap-4">
            {!loadingCat ? (
              prod_categories.map((cat, ind) => (
                <div key={ind} className="border-2 border-solid">
                  <div onClick={() => redirectCat(cat)} className="flex flex-col items-center">
                    <img src="/home3.jpeg"  className="h-60 w-70"/>
                    <p className="">{cat}</p>
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
                  <div onClick={() => redirectSeller(sel)} className="flex flex-col items-center">
                    <img src="/profile.jpeg" className="h-60 w-70"/>
                    <p>{sel}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading Sellers .. </p>
            )}
          </div>
          <footer>Footer</footer>
        </>
      ) : (
        <p>Login to access this</p>
      )}

    </div>
  );
};

export default Home;
