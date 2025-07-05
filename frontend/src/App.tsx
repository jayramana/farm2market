import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Order from "./components/Order";
import Profile from "./components/Profile";
function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
