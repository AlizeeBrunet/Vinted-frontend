import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({ token, setToken }) {
  return (
    <header>
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>

      <nav>
        {token ? (
          <span className="button-deconnect">
            <button
              onClick={() => {
                Cookies.remove("userToken");
                setToken("");
              }}
            >
              Se déconnecter
            </button>
          </span>
        ) : (
          <>
            <Link to="/signup">S'incrire</Link>

            <Link to="/login">Se connecter</Link>
          </>
        )}
        <Link to="/publish">Vends tes articles !</Link>
      </nav>
    </header>
  );
}
