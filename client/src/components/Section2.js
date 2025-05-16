import React from 'react'
import './styles/Section2.css'
import banscolaire from './images/banscolaire.webp'
import { Link } from 'react-router-dom'
import accimg from './images/accessoires.png'
import smartphonecard from './images/smartphonescard.png'
import boxiptvcard from './images/boxandroid.png'
import produitscolairecard from './images/produitscolairecard.png'

const Section2 = () => {
  return (
    <div className="cardbox">
      <div className="container3">
        <h2 className="titles2">Différents Outils Informatiques chez Nous</h2>
       
        <p> La Librairie Ennajah vous propose un large choix de produits scolaires, accessoires informatiques, smartphones, téléphones GSM et box IPTV Android.<br/> Profitez chaque mois de promotions exclusives pour vous équiper au meilleur prix ! </p>
        
        <div className="cards">
          <div className="card">
            <p className='sold'>-40%</p>
            <img src= {accimg} alt="casque"/>
            <h3>Accessoires Informatiques</h3>
            <p>Découvrez notre large gamme d’accessoires informatiques.</p>
            <p>A partir de 25 TND</p>
            <Link to="/accessoires"><button className="button-s3">Plus Details</button></Link>
          </div>
          
          <div className="card">
            <p className='sold'>-25%</p>
            <img src={smartphonecard} alt='cables'/>
            <h3>Smartphones</h3>
            <p>Les derniers modèles de smartphones à prix compétitifs.</p>
            <p>A partir de 199 TND</p>
            <Link to="/smartphones"><button className="button-s3">Plus Details</button></Link>
          </div>
          
          <div className="card">
            <p className='sold'>-30%</p>
            <img src={boxiptvcard} alt='gsm'/>
            <h3> Box & IPTV</h3>
            <p>Profitez d’un large choix d’ IPTV pour tous les goûts.</p>
            <p>A partir de 50 TND</p>
            <Link to="/iptv"><button className="button-s3">Plus Details</button> </Link>
          </div>
          
          <div className="card">
            <p className='sold'>-30%</p>
            <img src={produitscolairecard} alt='souris'/>
            <h3>Produits Scolaires</h3>
            <p>Tout le nécessaire pour la rentrée : qualité et petits prix garantis. </p>
            <p>A partir de 15 TND</p>
             <Link to="/produitsscolaire"> <button className="button-s3">Plus Details</button> </Link>
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