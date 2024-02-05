import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../pages/Signup.css";

export default function Signup({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (username && email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username,
            email,
            password,
            newsletter,
          }
        );

        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.token);

        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signup">
      <h2>S'inscrire</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom "
          value={username}
          onChange={(event) => {
            setErrorMessage("");
            setUsername(event.target.value);
          }}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setPassword(event.target.value);
          }}
        />

        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          checked={newsletter}
          onChange={(event) => {
            setErrorMessage("");
            setNewsletter(!newsletter);
          }}
        />
        <label htmlFor="newsletter">S'incrire à la newsletter</label>
        <p className="text">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>

        <button type="submit">S'inscrire</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>Tu as déjà un compte? Connecte-toi !</p>
    </div>
  );
}
