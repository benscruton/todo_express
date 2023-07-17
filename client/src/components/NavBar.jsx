import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import AppContext from "../context/AppContext";

const NavBar = () => {
  const {state} = useContext(AppContext);

  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => setMenuActive(!menuActive);

  return (
    <nav className = "navbar is-black mb-4 has-shadow">

      <div className = "navbar-brand">
        <div className = "navbar-item has-text-primary" href="https://bulma.io">
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
        <div className = "navbar-start ml-5">
          <NavLink
            to="/collections/add"
            className = {({isActive}) =>
              `navbar-item px-4 ${isActive ? "is-active has-background-primary has-text-black" : ""}`
            }
            onClick = {() => setMenuActive(false)}
          >
            Add
          </NavLink>
          
          <NavLink
            to="/collections/view"
            className = {({isActive}) =>
              `navbar-item px-4 ${isActive ? "is-active has-background-primary has-text-black" : ""}`
            }
            onClick = {() => setMenuActive(false)}
          >
            Show
          </NavLink>
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