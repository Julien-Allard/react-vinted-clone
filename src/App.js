import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
