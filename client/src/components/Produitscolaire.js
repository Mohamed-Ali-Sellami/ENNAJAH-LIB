import React from 'react'
import './styles/Produitscolaire.css'
import { useSelector } from 'react-redux'
import Card from './Card'
import Footer from './Footer'
import Navbar from './Navbar'
const Produitscolaire = () => {
  const allproducts = useSelector((store)=>store.Product?.product)
    console.log("voici all products",allproducts)
     const produitscolaire = Array.isArray(allproducts) ? allproducts.filter((data) => data?.Category === "produitscolaire") : [];
     console.log(produitscolaire)
  return (
    <div>
    <Navbar/>
    <div className='content1'>
      <h1> Liste des produits Scolaires جميع الادوات المدرسية</h1>

      {/* <div className='search-container'>
      <input type="text" placeholder="Search Smartphones" name="search"/>
      <button class="button-33" role="button">Search</button>
      </div> */}

      <div className='boxproduitscolaire'>
    {produitscolaire?.map((el)=><Card data={el}/>)}
      </div>
      
      </div>
      <Footer/>
    </div>
  )
}

export default Produitscolaire
