import { Routes, Route } from "react-router-dom";
import { useFtm } from "./store/useFtm";
import Home from "./components/Home";
import Order from "./components/Orders";
import Profile from "./components/Profile";
import BrowseFilter from "./components/Browse";
import IndividualProduct from "./components/IndividualProduct";
import BrowseviaCate from "./components/BrowseviaCate";
import BrowseviaSellers from "./components/BrowseviaSellers";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/browseonly" element={<BrowseFilter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/individual" element={<IndividualProduct />} />
        <Route path="/group-by-categories" element={<BrowseviaCate />} />
        <Route path="/group-by-topsellers" element={<BrowseviaSellers />} />
      </Routes>
    </main>
  );
}

export default App;
