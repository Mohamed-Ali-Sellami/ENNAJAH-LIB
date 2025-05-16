import React from 'react';
import './styles/Section1.css';
import { Link } from 'react-router-dom';

const Section1 = () => {
  return (
    <div className="section1-container">
      <div className="content1-container">
        <div className="text1-container">
          <h2 className="title1">Casque P9 Disponible Maintenant!</h2>
          <p className="paragraph1">
            Paragraphe. Vous pouvez le modifier et ajouter votre propre texte. 
            Double-cliquez ici ou cliquez sur « Modifier le texte » pour ajouter 
            votre contenu et personnaliser la police. C'est l'espace idéal pour 
            raconter une histoire et vous présenter à vos visiteurs.
          </p>
         <a href="http://localhost:3000/product/673b16336f8fc36e993eb886" target="_blank" rel="noreferrer"> <button className="buy-button1">Plus Details &gt;</button></a>
        </div>
        <div className="image-container1">
          <img 
            src="https://bigtec.tn/cdn/shop/files/telechargement_72.jpg?v=1710191071&width=1445" 
            alt="Casque audio noir" 
            className="headphones-image1" 
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;