import React from 'react';
import { useFetch } from '../../util/useFetch';
import "./../../css/card.css";


export default function Tutorial({tutorial}) {
    // bekijk https://scratch.mit.edu/discuss/topic/439490/?page=1#post-4423497
    // vb api: https://api.scratch.mit.edu/projects/561005727/
    // vb img: https://cdn2.scratch.mit.edu/get_image/project/561005727_200x200.png
    // <iframe src={`${tutorial.scratchUrl}embed`} allowtransparency="true" 
    // width="300" height="150" frameborder="0" scrolling="no" allowfullscreen></iframe>

    const scratchUrlBasis = "https://api.scratch.mit.edu/projects/";
    const scratchUrlProject = tutorial.scratchUrl ? tutorial.scratchUrl.slice(33) : '561290251/';
    const scratchUrlProjectId = scratchUrlProject.slice(0,9)
    const scratchUrlApi = `${scratchUrlBasis}${scratchUrlProject}`;

    // fetch api scratch 
    // foutmelding:
    //Access to XMLHttpRequest at 'https://api.scratch.mit.edu/projects/561249702/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // const projectInfo = useFetch(scratchUrlApi, [])

    // const {titel, leerdoelen,  categorie, pdfUrl, scratchUrl} = tutorial;
    return (
        <>
            <div className="card tutorial">                 
            <div className="card__header">
                <img src={`https://cdn2.scratch.mit.edu/get_image/project/${scratchUrlProjectId}_200x200.png`} alt={tutorial.titel} className="card__image"/>
            </div>
            <div className="card__content">  

                <span className="tag tag-teal">
                    {tutorial.categorie} 
                    {/* projectID: {scratchUrlProjectId} */}
                 </span>                     
                             
                 <h4>{tutorial.titel}</h4>                 
                 <p>{tutorial.omschrijving}</p>

                 <span className="tagline">
                    leerdoelen: {tutorial.leerdoelen}
                 </span>

            </div> 
            <div className="card__footer">
                 
                   <a href={tutorial.pdfUrl} target="_blank">handleiding pdf</a>
                |
               
                   <a href={tutorial.scratchUrl} target="_blank">speel het spel</a>
            
            </div>

            
            </div>
        </>

    )
}
