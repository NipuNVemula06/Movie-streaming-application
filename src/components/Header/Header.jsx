import React, { useState } from "react";
import "./Header.css";
import { IoSearch } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Search from "../Search/Search";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [headerbackground, setHeaderbackground] = useState(false);
  const [search, setSearch] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 70) {
      setHeaderbackground(true);
    } else {
      setHeaderbackground(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <header className={`${headerbackground ? "header header_bg" : "header"}`}>
      <NavLink to="/" className="header_leftsection">
        <span>Stream</span>
        <span className="header_logo">Flix</span>
      </NavLink>

      <nav
        className={`${
          open ? "header_mobile_middlesection " : "header_middlesection"
        }`}
      >
        <div className="" />
        <ul className="header_nav">
          {open && (
            <div className="header_nav_close">
              <MdOutlineClose
                onClick={() => setOpen(false)}
                className="header_nav_close_icon"
              />
            </div>
          )}

          {open && (
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="header_navlink"
            >
              <p>Home</p>
            </NavLink>
          )}

          {navlinks.map((item) => (
            <NavLink
              to={item.link}
              onClick={() => setOpen(false)}
              key={item.id}
              className="header_navlink"
            >
              <li>{item.title}</li>
            </NavLink>
          ))}

          {open && (
            <div
              onClick={() => {
                setOpen(false);
                setSearch(true);
              }}
              className="header_navlink"
            >
              <p>Search</p>
            </div>
          )}
        </ul>
      </nav>
      <div className="header_rightsection">
        <IoSearch
          className="header_searchicon"
          onClick={() => setSearch(true)}
        />
      </div>
      <div onClick={() => setOpen(true)} className="header_menu">
        <RiMenu3Line />
      </div>
      {search && <Search setSearch={setSearch} />}
    </header>
  );
};

export default Header;

const navlinks = [
  {
    id: 1,
    title: "Movies",
    link: "/movies",
  },
  {
    id: 2,
    title: "TV Series",
    link: "/tvseries",
  },
  {
    id: 4,
    title: "Genres",
    link: "/genres",
  },
  {
    id: 5,
    title: "My List",
    link: "/mylist",
  },
];
