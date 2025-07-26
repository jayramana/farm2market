import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Orders";
import Profile from "./components/Profile";
import BrowseFilter from "./components/Browse";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/browseonly" element={<BrowseFilter />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
