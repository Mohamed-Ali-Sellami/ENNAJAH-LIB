import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/Banniere.css"; // Ajout d'un fichier CSS personnalisé

const Banniere = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      image:
        "https://scontent.ftun18-1.fna.fbcdn.net/v/t39.30808-6/476950988_1042283007938756_755612837254219776_n.png?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=tRwS1nNuutoQ7kNvgGyXhgw&_nc_oc=AdhW6UEkSjIAT4q7XfNbnb9lASEPpXsH6WYYkUy-fuW5hKobr0Tra6Y8V6ZJtne4ZC0&_nc_zt=23&_nc_ht=scontent.ftun18-1.fna&_nc_gid=AUOcAfh1kqGv8vY41TdNn4B&oh=00_AYAC4q3hGuXjoSjGMbMUYW_olhf5ncANNYSBzMiiOEcqwQ&oe=67C64BAD",
      title: "Pointe de Vente Ooredoo ",
      text: "Tous les Services Ooredoo chez Nous ",
    },
    {
      image:
        "https://www.gnet.tn/wp-content/uploads/2024/09/banner-1920-x-567.png",
      title: "Pointe de Vente Globalnet",
      text: "Chez Librairie Ennajah et avec GlobalNet, vivez l'internet chez vous sans limite.",
    },
    {
      image:
        "https://www.leparisien.fr/resizer/P6QQIiknesQOfR4y_qZAmOmWbTg=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/RKH34U6CMG6KWZBVUU7TN7EXHY.jpg",
      title: "IPTV & Box android & Recepteurs ",
      text: "Vente IPTV et produits numeriques avec des offres exceptionnelles",
    },
  ];

  

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-item">
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="carousel-text">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banniere;
