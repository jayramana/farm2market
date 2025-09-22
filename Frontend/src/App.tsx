import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Orders";
import Profile from "./components/Profile";
import BrowseFilter from "./components/Browse";
import IndividualProduct from "./components/IndividualProduct";
import BrowseviaCate from "./components/BrowseviaCate";
import BrowseviaSellers from "./components/BrowseviaSellers";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/browse" element={<BrowseFilter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/individual" element={<IndividualProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/group-by-categories" element={<BrowseviaCate />} />
        <Route path="/group-by-topsellers" element={<BrowseviaSellers />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </main>
  );
}

export default App;
