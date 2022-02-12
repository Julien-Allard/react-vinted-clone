import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header token={token} setToken={setToken} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
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
