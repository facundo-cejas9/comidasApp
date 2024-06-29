import "./Footer.css";
import { assets } from "../../assets/assets";

export const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} />
         
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
        <img src={assets.app_store} />
        <img src={assets.play_store} />
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+54 351-552-222-33</li>
                <li>contact@comidasYa.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2024 PintóBajón. Todos los derechos reservados.
      </p>
    </div>
  );
};
