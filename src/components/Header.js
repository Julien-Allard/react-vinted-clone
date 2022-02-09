import mainLogo from "../assets/img/vinted-logo.png";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="main-logo">
          <img src={mainLogo} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
