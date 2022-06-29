import './hero.css';
import tearEffect from '../../assets/img/tear.svg';
import { Link } from 'react-router-dom';

const Hero = ({ token }) => {
  return (
    <div className="hero-container">
      <img className="hero-blank" src={tearEffect} alt="" />
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <Link to={token ? '/publish' : '/login'}>
          <button>Commencer à vendre</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
