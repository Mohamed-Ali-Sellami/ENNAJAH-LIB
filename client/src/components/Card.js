import React from 'react'
import "./styles/Card.css"

const Card = ({data}) => {
  return (
    <div>
      <div class="product-card">
    <img src={data?.Image} alt="image product"/>
    <h3>{data?.name}</h3>
    <p class="description">{data?.description}</p>
    <p class="price">{data?.price} DT</p>
    <p class="stock">En stock</p>
    <button class="buy-btn">J'achète</button>
</div>

    </div>
  )
}

export default Card
