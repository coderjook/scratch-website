import React from 'react';
import Intro from '../images/intro.mp4'

export default function Home() {
    return (
        <div className="container">
        <div className="wrapper">
   <video autoPlay loop muted class="wrapper__video">
      <source src={Intro} type='video/mp4'/>
   </video>  
</div>
          
        </div>
    )
}
