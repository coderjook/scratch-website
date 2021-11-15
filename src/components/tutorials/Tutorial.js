import React, {useState} from 'react';
import { useFetch } from '../../util/useFetch';
import "./../../css/card.css";
import UpdateTutorial from './UpdateTutorial';


export default function Tutorial({tutorial}) {

    const [openUpdateTutorial, setOpenUpdateTutorial] = useState(false);
    // bekijk https://scratch.mit.edu/discuss/topic/439490/?page=1#post-4423497
    // vb api: https://api.scratch.mit.edu/projects/561005727/
    // vb img: https://cdn2.scratch.mit.edu/get_image/project/561005727_200x200.png
    // <iframe src={`${tutorial.scratchUrl}embed`} allowtransparency="true" 
    // width="300" height="150" frameborder="0" scrolling="no" allowfullscreen></iframe>
    
    const scratchUrlBasis = "https://api.scratch.mit.edu/projects/";
    const scratchUrlProject = tutorial.scratchUrl ? tutorial.scratchUrl.slice(33) : '561290251/';
    const scratchUrlProjectId = scratchUrlProject.slice(0,9)
    const scratchUrlApi = `${scratchUrlBasis}${scratchUrlProject}`;

    const colorCategorie = tutorial.categorie && tutorial.categorie.substring(0, tutorial.categorie.indexOf("-"))

    // fetch api scratch foutmelding: https://gitlab.com/Marianne-v-R/coderjook-scratch-app/-/issues/3
    const dataScratch = useFetch("https://api.scratch.mit.edu/projects/561005727/",[])
    // const {titel, leerdoelen,  categorie, pdfUrl, scratchUrl} = tutorial;
    
    const handleUpdateTutorial = () => {
        console.log('updateTurial openen')
        setOpenUpdateTutorial(true);
    }

    return (
        <>
            {openUpdateTutorial && <UpdateTutorial tutorial={tutorial} openUpdateTutorial={openUpdateTutorial} setOpenUpdateTutorial={setOpenUpdateTutorial}  />   }  
            <div className="card tutorial">                 
            <div className="card__header">
                <img src={`https://cdn2.scratch.mit.edu/get_image/project/${scratchUrlProjectId}_200x200.png`} alt={tutorial.titel} className="card__image"/>
                <div className={`categorie mobile ${colorCategorie}`}>{tutorial.categorie} </div>
            </div>
            <div className="card__content">  

                <span className={`tag desktop ${colorCategorie}`}>
                    {tutorial.categorie} 
                    {/* projectID: {scratchUrlProjectId} */}
                 </span> 
                 
                                             
                             
                 <h4>{tutorial.titel} | <i className="material-icons icon" onClick={handleUpdateTutorial}>mode</i></h4>                 
                 <p>{tutorial.omschrijving}</p>
 
                 <span className="tagline">
                    leerdoelen: {tutorial.leerdoelen}
                 </span>

                <div className="card__footer mobile">
                   <a href={tutorial.pdfUrl} target="_blank" className="btn">handleiding</a>
                   <a href={tutorial.scratchUrl} target="_blank" className="btn">speel spel</a>
             </div>


            </div> 
                <div className="card__footer desktop">
                   <a href={tutorial.pdfUrl} target="_blank">handleiding pdf</a>
                |
                   <a href={tutorial.scratchUrl} target="_blank">speel het spel</a>
             </div>

            
            </div>
        </>

    )
}
