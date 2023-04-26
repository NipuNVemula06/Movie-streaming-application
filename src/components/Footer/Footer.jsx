import React from "react";
import "./Footer.css";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_topsection">
          <span className="footer_developer">
            Developed by{" "}
            <span className="footer_developer_name"> Nipun Vemula</span>
          </span>
          <div className="footer_socials">
            <a
              href="https://www.linkedin.com/in/nipun-vemula-63991220a/"
              target="_blank"
              className="footer_social_icon"
            >
              <AiFillLinkedin size={26} />
            </a>
            <a
              href="https://github.com/NipuNVemula06"
              target="_blank"
              className="footer_social_icon"
            >
              <AiFillGithub size={24} />
            </a>
          </div>
        </div>
        <div className="footer_bottomsection">
          StreamFlix © 2023 . All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
