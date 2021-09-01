import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import logo from "./logo.png";
import "./NavBar.css";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <IconContext.Provider value={{ color: "#8B8B8B", size: "25px" }}>
      <div className="container">
        <header className="header">
          <div className="header-logo">
            <Link to="#" className="logo-pic">
              <img src={logo} alt="Logo" />
            </Link>
            <div className="logo-content">
              <span className="logo-text">MeliorAI KnExt</span>
              <span className="logo-subtext">Admin Dashboard</span>
            </div>
          </div>
        </header>
        <div className="user">
          <span className="user-img"></span>
          <span className="user-text">Hello Loig!</span>
        </div>
        <nav className="nav-menu ">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeClassName="active">
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="settings">
            <p className="settings-text">Admin Settings</p>
            <p className="settings-subtext">Users & Permissions</p>
          </div>
          <div className="settings-icons">
            {SidebarData.map((item, ind) => {
              return (
                <div key={ind} className={item.cName}>
                  <Link to={item.path} className="icons">
                    <div>{item.icon}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </IconContext.Provider>
  );
}

export default NavBar;
