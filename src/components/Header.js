import mainLogo from "../assets/img/vinted-logo.png";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="main-logo">
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
        </div>
        <div className="signup-connect">
          <Link to="/signup">
            <button className="signup">S'inscrire</button>
          </Link>
          <button className="connect">Se connecter</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
