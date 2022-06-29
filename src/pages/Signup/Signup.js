import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signupInfos = {
        username: name,
        email: email,
        password: password,
        newsletter: newsletter,
      };

      const response = await axios.post(
        'https://my-vinted-clone.herokuapp.com/user/signup',
        signupInfos,
      );

      const token = response.data.token;
      Cookies.set('token', token);

      navigate('/');
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form-container">
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="input-text"
              value={name}
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              className="input-text"
              value={email}
              type="email"
              placeholder="Adresse mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="input-text"
              value={password}
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="signup-newsletter">
              <span className="signup-checkbox-container">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setNewsletter(event.target.checked);
                  }}
                />
                <span>S'inscrire à notre newsletter</span>
              </span>
              <span className="signup-newsletter-text">
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </span>
            </div>
            <input
              type="submit"
              value="S'inscrire"
              className="signup-form-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
