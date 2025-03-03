import React from 'react'
import './styles/Accessoires.css'
import { useSelector } from 'react-redux'
import Card from './Card'

const Accessoires = () => {

  const allproducts = useSelector((store)=>store.Product?.product)
    console.log("voici all products",allproducts)
     const  accessoires = allproducts.filter((data) => data?.Category === "Accessoires");
     console.log(accessoires)

  return (
    
       <div className='content1'>
      <h1> Liste Accessoires</h1>

      {/* <div className='search-container'>
      <input type="text" placeholder="Search Smartphones" name="search"/>
      <button class="button-33" role="button">Search</button>
      </div> */}

      <div className='boxphone'>
    {accessoires?.map((el)=><Card data={el}/>)}
      </div>
      
    </div>
  )
}

export default Accessoires
