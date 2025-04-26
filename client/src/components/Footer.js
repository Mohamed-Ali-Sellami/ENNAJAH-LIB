import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Accueil</a>
        <a href="#">Contact</a>
        <a href="#">Mentions légales</a>
      </div>

      <div className="contact-info">
        <p>
          Adresse : Rue Habib Bourguiba Teboulbou Gabès (près Lycée Teboulbou) - 
          <span className="arabe"> شارع الحبيب بورقيبة تبلبو قابس</span>
        </p>
        <p>Email : <a href="mailto:librairieennajah1994@gmail.com">librairieennajah1994@gmail.com</a></p>
        <p>Téléphone : <a href="tel:+21622911011">+216 22 911 011</a></p>
      </div>

      <div className="social-links">
        <a href="https://www.facebook.com/profile.php?id=61560411596375" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
      </div>

      <p className="copyright">
        &copy; 2024 Founded by Sellami MA. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
