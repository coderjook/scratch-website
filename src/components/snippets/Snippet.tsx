import React, {useState} from 'react';
import { useFetch } from '../../util/useFetch';
import "./../../css/card.css";
import UpdateSnippet from './UpdateSnippet';
import { ISnippet } from './SnippetsList';

type TutorialProps = {
    snippet : ISnippet
}

export default function Snippet(props : TutorialProps) {

    const {snippet} = props

    const [openUpdateSnippet, setOpenUpdateSnippet] = useState(false);
   
    
    const scratchUrlBasis = "https://api.scratch.mit.edu/projects/";
    const scratchUrlProject = snippet.scratchUrl ? snippet.scratchUrl.slice(33) : '561290251/';
    const scratchUrlProjectId = scratchUrlProject.slice(0,9)
    const scratchUrlApi = `${scratchUrlBasis}${scratchUrlProject}`;

    const colorCategorie = snippet.categorie && snippet.categorie.substring(0, snippet.categorie.indexOf("-"))

     
    const handleUpdateSnippet = () => {
        console.log('updateTurial openen')
        setOpenUpdateSnippet(true);
    }

    return (
        <>
            {openUpdateSnippet && <UpdateSnippet snippet={snippet} openUpdateSnippet={openUpdateSnippet} setOpenUpdateSnippet={setOpenUpdateSnippet}  />   }  
            <div className="card snippet">                 
            <div className="card__header">
                <img src={snippet.gifUrl ? snippet.gifUrl : snippet.pdfUrl} alt={snippet.titel} className="card__image"/>
                <div className={`categorie mobile ${colorCategorie}`}>{snippet.categorie} </div>
            </div>
            <div className="card__content">  

                <span className={`tag desktop ${colorCategorie}`}>
                    {snippet.categorie} 
                    {/* projectID: {scratchUrlProjectId} */}
                 </span> 
                 
                                             
                             
                 <h4>{snippet.titel} | <i className="material-icons icon" onClick={handleUpdateSnippet}>mode</i></h4>                 
                 <p>gif: {snippet.omschrijving}</p>
 
                 <span className="tagline">
                    leerdoelen: {snippet.leerdoelen}
                 </span>
                {snippet.gifUrl}
                <div className="card__footer mobile">
                   <a href={snippet.pdfUrl} target="_blank" className="btn">bekijk code</a>
                   <a href={snippet.scratchUrl} target="_blank" className="btn">voorbeeld</a>
             </div>


            </div> 
                <div className="card__footer desktop">
                   <a href={snippet.pdfUrl} target="_blank">bekijk code</a>
                   { snippet.scratchUrl &&
                    <>|
                   <a href={snippet.scratchUrl} target="_blank">voorbeeld scratch</a>~</>
                   }
             </div>

            
            </div>
        </>

    )
}
