import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Order";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
