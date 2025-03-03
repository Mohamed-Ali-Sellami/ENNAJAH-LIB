import React from 'react'
import './styles/Section3.css'
import ooredoo from'./images/ooredoo.png'
import xiaomi from './images/xiaomi.png'
import infinix from './images/infinix.png'
import gnet from './images/gnet.png'
import vidvie from './images/vidvie.png'
import inkax from './images/inkax.png'
import smartek from './images/smartek.png'

const Section3 = () => {
  return (
    <div>



<div className='body3'>
    <div className="header3">
        Chez <a href="#">Librairie Ennajah</a>, Découvrez une large gamme de fournitures scolaires, d'accessoires informatiques et d'équipements IPTV, avec des prix compétitifs et une livraison rapide partout en Tunisie..
    </div>

    <section className="section3">
        <h2>La Smartphones & GSM : le choix de la performance et de la qualité</h2>
        <p>
            Entrez dans l'univers <a href="#">GSM</a>, où chaque produit est conçu pour vous offrir l'excellence. 
            Optez pour le <a href="#">Smartek</a> ou le <a href="#">Joytel</a>, des alliés de productivité inégalés. 
            Plongez dans l'innovation avec le<a href="#">xiaomi</a>, le smartphone iconique qui transforme votre quotidien.
        </p>
    </section>

    <section className="section3">
        <h2>les Accessoires informatiques : La Technologie à Votre Portée</h2>
        <p>
        Vous êtes à la recherche des meilleurs accessoires informatiques ? Ne cherchez plus !
Librairie Ennajah est votre destination high-tech au region de Gabes . Nous vous proposons une large gamme d’accessoires,
rigoureusement sélectionnés pour leur qualité et leur fiabilité. Des marques renommées aux dernières nouveautés,
vous trouverez forcément ce qu’il vous faut pour compléter ou améliorer votre équipement informatique.
        </p>
    </section>

    <section className="section3">
        <h2>Notre Collection des Fournitures Scolaires</h2>
        <p>
            Découvrez notre sélection d'<a href="#">Fournitures Scolaires</a> de qualité, issu des plus grandes marques. 
            <span className="product-links">Cahiers, stylos, trousses, sacs à dos, calculatrices, règles......</span> 
            Nous avons choisi pour vous les articles les plus pratiques et tendance.
            Faites confiance à notre expertise pour bien préparer la rentrée avec des fournitures durables et adaptées à tous les besoins.
        </p>
    </section>

    <section className="section3">
        <h2>Imprimez vos documents et photos avec une qualité professionnelle</h2>
        <p>
            Librairie Ennajah propose une large gamme d'<a href="#">IPTV</a>  <a href="#">Alpha</a>, <a href="#">Orca</a>, et <a href="#">Avatar</a> et plusiers choix .Profitez d’un accès illimité à vos chaînes préférées, des contenus exclusifs et des programmes variés.
Nos solutions IPTV sont compatibles avec plusieurs appareils et faciles à configurer,
garantissant une expérience fluide et immersive pour tous les utilisateurs.
        </p>
    </section>

    <div className="footer3">
        Chaque membre de notre équipe travaille avec passion pour vous apporter le meilleur service.
    </div>
</div>

<div class="slider3">
	<div class="slide3-track">
		<div class="slide3">
			<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ooredoo_Logo_Red_on_White_Bg_RGB.png" height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={xiaomi} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={infinix} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={gnet} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={vidvie} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={inkax} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={smartek} height="100" width="100" alt="" />
		</div>
		<div class="slide3">
			<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ooredoo_Logo_Red_on_White_Bg_RGB.png" height="100" width="200" alt="" />
		</div>
		<div class="slide3">
			<img src={xiaomi} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={infinix} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={gnet} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={vidvie} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={inkax} height="100" width="250" alt="" />
		</div>
		<div class="slide3">
			<img src={smartek} height="100" width="250" alt="" />
		</div>
		
        
	</div>
</div>








      
    </div>
  )
}

export default Section3
