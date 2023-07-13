import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import AppContext from "../context/AppContext";

const NavBar = () => {
  const {state} = useContext(AppContext);

  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => setMenuActive(!menuActive);

  return (
    <nav className = "navbar">

      <div className = "navbar-brand">
        <div class = "navbar-item" href="https://bulma.io">
          LISTY McLISTFACE
        </div>

        <a
          role = "button"
          className = {`navbar-burger ${menuActive ? "is-active" : ""}`}
          onClick = {toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className = {`navbar-menu ${menuActive ? "is-active" : ""}`}>
        <div className = "navbar-start">
          <Link
            to="/"
            className = "navbar-item"
            onClick = {() => setMenuActive(false)}
          >
            Home
          </Link>

          <Link
            to="/collections/add"
            className = "navbar-item"
            onClick = {() => setMenuActive(false)}
          >
            Add
          </Link>
          
          <Link
            to="/collections/view"
            className = "navbar-item"
            onClick = {() => setMenuActive(false)}
          >
            Show
          </Link>
        </div>

        <div className = "navbar-end">
          <span className = "navbar-item">
            <button
              className = "button is-info"
              onClick={() => console.log(state)}
            >
              Log state
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;