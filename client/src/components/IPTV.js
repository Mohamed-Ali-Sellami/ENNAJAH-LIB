import React from 'react'
import './styles/IPTV.css'
import { useSelector } from 'react-redux'
import Card from './Card'
import Navbar from './Navbar'
import Footer from './Footer'
const IPTV = () => {


    const allproducts = useSelector((store)=>store.Product?.product)
    console.log("voici all products",allproducts)
     const  iptv = allproducts.filter((data) => data?.Category === "IPTV");
     console.log(iptv)

  return (
    
    <div>
      <Navbar/>
        <div className='content1'>
      <h1> Liste IPTV & Les Recepteurs</h1>

      {/* <div className='search-container'>
      <input type="text" placeholder="Search Smartphones" name="search"/>
      <button class="button-33" role="button">Search</button>
      </div> */}

      <div className='boxiptv'>
    {iptv?.map((el)=><Card data={el}/>)}
      </div>
      
    </div>
      <Footer/>
    </div>
  )
}

export default IPTV
