import React from 'react';
import Intro from '../images/intro.mp4'

export default function Home() {
    return (
        <div className="home">
            <div className="hero">
                <div className='container row'>
                <div className='hero-text row'>
                    <p>Maak je eigen <span>toffe</span> games</p>
                    
                    <p>Speel jij het liefst computerspelletjes? En wil je nu <span>je eigen game </span>maken? <br />
                    Top, dan kun hier direct aan de slag. </p>
                    <h3>GAME ON,<span> GO SCRATCH!</span></h3>
                   
                </div>
                <div className='hero-image row'>
                    <video autoPlay loop muted className="wrapper__video">
                        <source src={Intro} type='video/mp4'/>
                    </video>
                    
                    <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-green">speel het spel</a>
                </div>                
                </div>
            </div>


            <div className="content">  
             <div className=' container row'>            
               <div className="col"> 
                    <h3>Kant en klare Handleidingen</h3>                  
                    <p>
                        Werk met een uitgewerkt stappenplan, en volg nauwkeurig alle stappen van A tot Z en zo maak jij je game in no time.
                    </p>
                     <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-green-outline">Ga naar de handleidingen</a>
                </div>
                <div className="col">
                    <h3>Spelelementen</h3> 
                    <p>
                        Zit jij al boordevol ideeën. En wil jij direct aan de slag met je eigen spel, gebruik dan de snippets met programmeerscripts en pas deze toe op jouw eigen spel.
                    </p>
                     <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-blue-outline">Ga naar de snippets</a>
                </div>
                <div className="col">
                    <h3>FAQ</h3>
                    <p>
                        Loop je vast? Kijk dan hier of de oplossing van jouw probleem erbij zit. Dan ben je in no-time weer back on track
                    </p>
                     <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-orange-outline">Ga naar faq</a>
               </div>  
               </div>    
            </div>

        </div>
           
    )
}
