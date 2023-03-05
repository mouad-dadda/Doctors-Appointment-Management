import React from "react";
import "../Css/HomeCss/Footer.css";
const Footer = () => {
  return (
    <footer className="footer_height">
      <div className="lgine"></div>
      <div className="_container content_footer">
        <img src="./img/logo.png" alt="" />
        <p>Copyright © 2023 Doctolib, tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;