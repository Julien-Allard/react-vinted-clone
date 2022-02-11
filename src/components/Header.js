import mainLogo from "../assets/img/vinted-logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const disconnect = () => {
    Cookies.remove("token");
    setToken(Cookies.get("token"));
  };

  return (
    <header>
      <div className="header-container">
        <div className="main-logo">
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
        </div>
        <div className="signup-connect">
          {token ? (
            <button className="disconnect-btn" onClick={disconnect}>
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="signup-btn">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login-btn">Se connecter</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
