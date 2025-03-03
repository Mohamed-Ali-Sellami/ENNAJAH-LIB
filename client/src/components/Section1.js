import React from 'react';
import './styles/Section1.css';

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
          <button className="buy-button1">ACHETER &gt;</button>
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