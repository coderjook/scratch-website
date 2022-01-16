import React, { useEffect, useState, useContext } from "react";
import firebase from "../../util/firebase";
import Snippet from './Snippet';
import UpdateSnippet from "./UpdateSnippet";
import { ContextType, ISnippet} from './Interfaces';
import { SnippetContext } from '../../util/snippetContext';

 


export default function SnippetsList() {
  const {snippetControl } = useContext(SnippetContext) as ContextType;

  const [snippetsList, setSnippetsList] = useState<ISnippet[]>([]);
  const [filterSnippetsList, setFilterSnippetsList] = useState<ISnippet[]>(snippetsList);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [currentCategorie, setCurrentCategorie] = useState('alle opdrachten');
  const [toggleCategorie, setToggleCategorie] = useState(false);
  const [device, setDevice] = useState('');
  
  console.log( 'device:', device);
  

   useEffect(() => {
    const imageRef = firebase.database().ref("snippets");
    imageRef.on("value", (snapshot) => {
    //   console.log("UE snippetsList snapshot:",snapshot.val());

      const snippets = snapshot.val();
      const snippetsList: ISnippet[] = [];
      for (let objName in snippets) {
        // console.log("UE snippetsList for-loop objName:",objName)
        snippetsList.push({...snippets[objName], objName: objName, id: objName });       
      }
      //   console.log("UE snippetsList snippetlist:",snippetsList);
      setSnippetsList(snippetsList);
      setFilterSnippetsList(snippetsList)
      const allcurrentCategories: string[] = ["alle opdrachten", ...Array.from(new Set(snippetsList.map((item) => item.categorie)))];
      setAllCategories(allcurrentCategories);
    });

    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  

    if (viewportWidth >= 900 ) {
        setToggleCategorie(true);
        setDevice('desktop')
     } else {
         setToggleCategorie(false);
        setDevice('mobile')
     }

  }, [ window.innerWidth, document.documentElement.clientWidth ]);
  
    const handleFiltersnippetsList = (categorie : string) => {
        if (categorie === "alle opdrachten") {
        setFilterSnippetsList(snippetsList);
        setCurrentCategorie(categorie);
         if ( device === 'mobile') {
            setToggleCategorie(!toggleCategorie)
        }
        return;
        }
        const newsnippetsList = snippetsList.filter((tutorial) => tutorial.categorie === categorie);
        setFilterSnippetsList(newsnippetsList);
        setCurrentCategorie(categorie);
        
         if ( device === 'mobile') {
            setToggleCategorie(!toggleCategorie)
        }
    };

    const determineColor = (categorie : string) => {
        return   categorie.substring(0, categorie.indexOf("-"))
    }

    return (
        <>
        {snippetControl.openUpdate && <UpdateSnippet /> }
        <div className="snippets">
            <div className="header">
                <div className="container">
                    <h2>Codesnippets</h2> 
                    <p>Zit jij al boordevol ideeën. En wil jij direct aan de slag, gebruik dan deze codesnippets bij het maken van je spel. Bestuur je sprite, voeg een puntentelling toe, of maak je spel spannender met vijanden. Gebruik deze spelelementen om je game op te leuken.</p>
                </div>
            </div> 
            <div className="container">
               
                

                <div className="snippetslist">
                    <div className="container container__snippetslist">
                        { device === "mobile" &&
                        <div className={`filter ${device}`} onClick={() => {setToggleCategorie(!toggleCategorie)}}>{currentCategorie === 'alle opdrachten' ? `gebruik een filter` : `huidige filter: ${currentCategorie} `} </div>
                        }                           
                        {toggleCategorie &&
                            <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                
                                <div className={`btn ${categorie} ${device}`} onClick={() => handleFiltersnippetsList(categorie)} key={categorie}>{categorie}</div>
                              

                            ))}
                        </div>
                        }
                        <div className="snippets">
                            {filterSnippetsList && filterSnippetsList.map((snippet, index) => (
                                
                                <Snippet snippet={snippet} key={index} />
                                
                        )
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
     )
}
