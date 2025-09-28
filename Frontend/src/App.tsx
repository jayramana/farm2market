import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Orders";
import Profile from "./components/Profile";
import BrowseFilter from "./components/Browse";
import BrowseviaCate from "./components/BrowseviaCate";
import BrowseviaSellers from "./components/BrowseviaSellers";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Wishlist from "./components/WishList"


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to='/register' replace/> } />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/browse" element={<BrowseFilter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/group-by-categories" element={<BrowseviaCate />} />
        <Route path="/group-by-topsellers" element={<BrowseviaSellers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </main>
  );
}

export default App;
