import React from 'react'
import Navbar from '../Navbar/Navbar.tsx'
import Product from '../product/Product.tsx'
import Slider from '../Sliders/Slider.tsx'


const Home = ({iduser}) => {

console.log("from home",iduser);

  
  return (
    <div>
        <Navbar/>
        <Slider />
        <Product iduser={iduser} />
    </div>
  )
}

export default Home