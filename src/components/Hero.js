import "../components/hero.css";
import tearEffect from "../assets/img/tear.svg";
import { Link } from "react-router-dom";
import Login from "../pages/Login";

const Hero = () => {
  return (
    <div className="hero-container">
      <img className="hero-blank" src={tearEffect} alt="" />
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <Link to="/login">
          <button>Commencer à vendre</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
