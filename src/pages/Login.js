import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../components/login.css";
import axios from "axios";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        data
      );

      const token = response.data.token;
      Cookies.set("token", token);
      setToken(token);

      navigate("/");

      console.log(response);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="signup-form-container">
          <h1>Se connecter</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input type="submit" value="Se connecter" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
