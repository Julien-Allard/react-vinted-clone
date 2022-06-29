import mainLogo from '../../assets/img/vinted-logo.png';
import { Link } from 'react-router-dom';
import './header.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ token, setToken, setSearch, sort, setSort }) => {
  const disconnect = () => {
    Cookies.remove('token');
    setToken(Cookies.get('token'));
  };

  const searchItem = (value) => {
    setSearch(value);
  };

  //Gestion du tri dans l'ordre asc/desc
  const handleSort = (isChecked) => {
    if (isChecked === false) {
      setSort('price-asc');
    }

    if (isChecked === true) {
      setSort('price-desc');
    }
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
          <div className="header-sort-menu">
            <div className="sort-asc-desc">
              <span>Trier par prix :</span>
              <label htmlFor="sort-checkbox" className="sort-checkbox">
                {sort === 'price-asc' ? (
                  <FontAwesomeIcon icon="circle-up" className="sort-icon-asc" />
                ) : (
                  <FontAwesomeIcon
                    icon="circle-down"
                    className="sort-icon-desc"
                  />
                )}
              </label>
              <input
                type="checkbox"
                id="sort-checkbox"
                onChange={(event) => {
                  handleSort(event.target.checked);
                }}
              />
            </div>
          </div>
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
        <Link to="/publish">
          <button className="publish-header-btn">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
