import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
