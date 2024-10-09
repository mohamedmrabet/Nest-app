import React, { useState } from 'react';
import dummy from '../Sliders/data/slider.js';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; 

const Slider = () => {
  const [data, setData] = useState(dummy); 
  console.log("from slider", dummy);

  return (
    <div className='relative mt-10 w-full'>
      <Slide easing="ease" duration={5000} transitionDuration={500}>
        {data.map((e, i) => (
          <div className='flex justify-center items-center h-[100vh] bg-gray-200' key={i}>
            <img
              className='slide-image object-cover w-full h-full' 
              src={e.image}
              alt={e.name} 
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
