import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';
import axios from 'axios';

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        'https://my-vinted-clone.herokuapp.com/user/login',
        data,
      );

      const token = response.data.token;
      const userIdentity = response.data._id;
      Cookies.set('token', token);
      Cookies.set('userIdentity', userIdentity);
      setToken(token);

      navigate('/publish');

      // console.log(response);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <h1>Se connecter</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="input-text"
              type="text"
              placeholder="Adresse mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="input-text"
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              type="submit"
              value="Se connecter"
              className="login-form-btn"
            />
          </form>
          <Link to="/signup">
            <p className="to-signup-text">Pas encore inscrit ? Par ici !</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
