import React from 'react'
import './styles/Section2.css'
import banscolaire from './images/banscolaire.webp'
import { Link } from 'react-router-dom'

const Section2 = () => {
  return (
    <div className="cardbox">
      <div className="container3">
        <h2 className="titles2">Différents Outils Informatiques chez Nous</h2>
       
        <p> La Librairie Ennajah propose une large gamme d’accessoires informatiques et de smartphones de qualité. Chaque mois, profitez de promotions exclusives sur nos produits pour vous équiper au meilleur prix ! </p>
        
        <div className="cards">
          <div className="card">
            <p className='sold'>-40%</p>
            <img src="https://spacenet.tn/179460-large_default/micro-casque-bluetooth-jbl-tune-720bt-bleu.jpg" alt="casque"/>
            <h3>Casques</h3>
            <p>Differentes Casques et les kits chez nous.</p>
            <p>A partir de 25 TND</p>
            <button className="button-s3">Plus Details</button>
          </div>
          
          <div className="card">
            <p className='sold'>-50%</p>
            <img src="https://www.istore.com.tn/1786-large_default/belkin-cable-usb-c-vers-usb-a-boost-charge-3-m-noir.jpg" alt='cables'/>
            <h3>Cables</h3>
            <p>Differents Cables Mobile, TV, PCs</p>
            <p>A partir de 10 TND</p>
            <button className="button-s3">Plus Details</button>
          </div>
          
          <div className="card">
            <p className='sold'>-30%</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwKaa9IG2qWAqVR335x2WWL3Da-_Mhtem2gA&s" alt='gsm'/>
            <h3>Vente Smartphones et GSM</h3>
            <p>Vente Smartphones et Simple Telephones</p>
            <p>A partir de 50 TND</p>
            <button className="button-s3">Plus Details</button>
          </div>
          
          <div className="card">
            <p className='sold'>-30%</p>
            <img src="https://www.sbsinformatique.com/3597/tunisie/home/souris-gamer-razer-deathadder-v2-tunisie.jpg" alt='souris'/>
            <h3>Vente Differentes Accessoires informatiques</h3>
            <p>Vente plusieures Accessoires tels que souris, claviers, ...</p>
            <p>A partir de 15 TND</p>
            <button className="button-s3">Plus Details</button>
          </div>
        </div>
      </div>
      
      <div className="banner-container">
        <Link to="/produitsscolaire">
          <img src={banscolaire} alt='bannière produits scolaires' className="banner-image"/>
        </Link>
      </div>
    </div>
  )
}

export default Section2