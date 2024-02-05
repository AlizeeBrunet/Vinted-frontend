import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import "../pages/Login.css";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email,
            password,
          }
        );
        Cookies.set("userToken", data.token, { secure: true });

        setToken(data.token);

        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="login">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Se connecter</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>Pas encore de compte ? Inscris-toi !</p>
    </div>
  );
}
