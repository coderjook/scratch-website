import React, {useState} from 'react';
import { useFetch } from '../../util/useFetch';
import "./../../css/card.css";
import UpdateTutorial from './UpdateTutorial';

type TutorialProps = {
    tutorial: {
        id: number
        titel: string 
        categorie: string
        leerdoelen: string
        omschrijving: string 
        scratchUrl: string 
        pdfName: string
        pdfUrl: string
    }
}


export default function Tutorial(props:TutorialProps) {

    const {tutorial} = props;

    const [openUpdateTutorial, setOpenUpdateTutorial] = useState<boolean>(false);
    
    const scratchUrlBasis : string = "https://api.scratch.mit.edu/projects/";
    const scratchUrlProject : string = tutorial.scratchUrl ? tutorial.scratchUrl.slice(33) : '561290251/';
    const scratchUrlProjectId : string = scratchUrlProject.slice(0,9)
    const scratchUrlApi = `${scratchUrlBasis}${scratchUrlProject}`;

    const colorCategorie: string = tutorial.categorie && tutorial.categorie.substring(0, tutorial.categorie.indexOf("-"))
      
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
                   <a href={tutorial.pdfUrl} target="_blank">handleiding pdf</a>                |
                   <a href={tutorial.scratchUrl} target="_blank">speel het spel</a>
            </div>
       
         </div>
        </>

    )
}
