import mainLogo from "../assets/img/vinted-logo.png";
import { Link } from "react-router-dom";
import "./header.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setToken, setSearch }) => {
  const disconnect = () => {
    Cookies.remove("token");
    setToken(Cookies.get("token"));
  };

  const searchItem = (value) => {
    setSearch(value);
  };

  return (
    <header>
      <div className="header-container">
        <div className="main-logo">
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
        </div>
        <div className="header-search-container">
          <input
            type="search"
            className="header-searchbar"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              searchItem(event.target.value);
            }}
          />
          <FontAwesomeIcon
            icon="magnifying-glass"
            className="header-searchbar-icon"
          />
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
