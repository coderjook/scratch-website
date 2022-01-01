import React, {useState, useContext} from 'react';
import "./../../css/card.css";
import { ISnippet, ISnippetControl } from './Interfaces';
import { SnippetContext } from '../../util/snippetContext';

type SnippetProps = {
    snippet : ISnippet
    snippetControl: ISnippetControl
   
    setSnippetControl: any
   
}

export default function Snippet(props : SnippetProps) {

    const {snippet, snippetControl, setSnippetControl} = props
    const {currentSnippet, setCurrentSnippet } = useContext(SnippetContext) as ContextType;
    const scratchUrlBasis = "https://api.scratch.mit.edu/projects/";
    const scratchUrlProject = snippet.scratchUrl ? snippet.scratchUrl.slice(33) : '561290251/';
    const scratchUrlProjectId = scratchUrlProject.slice(0,9)
    const scratchUrlApi = `${scratchUrlBasis}${scratchUrlProject}`;

    const colorCategorie = snippet.categorie && snippet.categorie.substring(0, snippet.categorie.indexOf("-"))

     
    const handleUpdateSnippet = () => { 
        console.log('updateTutorial openen:', snippetControl)
        setCurrentSnippet(
            {
                id: snippet.id ,
                objName: snippet.objName,
                titel: snippet.titel ,
                categorie: snippet.categorie,
                leerdoelen: snippet.leerdoelen ,
                omschrijving: snippet.omschrijving, 
                scratchUrl: snippet.scratchUrl ,
                pdfName: snippet.pdfName,
                pdfUrl: snippet.pdfUrl,
                gifName: snippet.gifName,
                gifUrl: snippet.gifUrl
            }
        )
        setSnippetControl({ ...snippetControl, openUpdate: true})
      
    }

    return (
        <>
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
                 <p>{snippet.omschrijving}</p>
 
                 <span className="tagline">
                    leerdoelen: {snippet.leerdoelen}
                 </span>
                
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
