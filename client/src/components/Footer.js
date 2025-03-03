import React from 'react'
import './styles/Footer.css'
import logof from './images/logo.png'
const Footer = () => {
  return (
    <div>
     <div className='bodyf'>
    <footer>
        <div class="footer-links">
            <a href="#">Accueil</a>
            <a href="#">Contact</a>
            <a href="#">Mentions légales</a>
        </div>
        <div class="contact-info">
            <p>Adresse  : Rue Habib Bourguiba Teboulbou Gabes (prés Lycée Teboulbou)         شارع الحبيب بورقيبة تبلبو قابس </p>
            <p>Email : librairieennajah1994@gmail.com.</p>
            <p>Téléphone : +216 22 911 011</p>
        </div>
        <p>&copy; 2024 Mon Site Web. Tous droits réservés.</p>
    </footer>
</div>
    </div>
  )
}

export default Footer
