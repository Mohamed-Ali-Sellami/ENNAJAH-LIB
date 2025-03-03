import React from 'react'
import './styles/Smartphones.css'
import { useSelector } from 'react-redux'
import Card from './Card'

const Smartphones = () => {

  const allproducts = useSelector((store)=>store.Product?.product)
    console.log("voici all products",allproducts)
     const  smartphones = allproducts.filter((data) => data?.Category === "smartphones");
     console.log(smartphones)
  return (
    <div className='content1'>
      <h1> Listes Gsm & Smartphones</h1>

      {/* <div className='search-container'>
      <input type="text" placeholder="Search Smartphones" name="search"/>
      <button class="button-33" role="button">Search</button>
      </div> */}

      <div className='boxphone'>
    {smartphones?.map((el)=><Card data={el}/>)}
      </div>
      
    </div>
  )
}

export default Smartphones
