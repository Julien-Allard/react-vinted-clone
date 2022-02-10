import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../components/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        signupInfos
      );

      const token = response.data.token;
      Cookies.set("token", token);

      navigate("/");
      // console.log(response);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-form-container">
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              value={email}
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              value={password}
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="signup-newsletter">
              <span>
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setNewsletter(event.target.checked);
                  }}
                />
                <span>S'inscrire à notre newsletter</span>
              </span>
              <span>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </span>
            </div>
            <input type="submit" value="S'inscrire" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
