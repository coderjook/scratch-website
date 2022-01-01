import react, { useEffect, useState } from "react";
import firebase from "../../util/firebase";
import Snippet from './Snippet';
import UpdateSnippet from "./UpdateSnippet";
import { ISnippet, ISnippetControl} from './Interfaces';

 const initialInputState = {   
    id: 0 ,
    objName: '',
    titel: '' ,
    categorie: '',
    leerdoelen: '' ,
    omschrijving: '', 
    scratchUrl: '' ,
    pdfName: '',
    pdfUrl: '',
    gifName: '',
    gifUrl: ''
 }
  


export default function SnippetsList() {
  const [snippetsList, setSnippetsList] = useState<ISnippet[]>([]);
  const [currentSnippet,setCurrentSnippet] = useState<ISnippet>(initialInputState);
  const [snippetControl, setSnippetControl] = useState<ISnippetControl>({ storageName: '', openUpdate: false, openList: false});
  const [filterSnippetsList, setFilterSnippetsList] = useState<ISnippet[]>(snippetsList);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [currentCategorie, setCurrentCategorie] = useState('alle opdrachten');
  const [toggleCategorie, setToggleCategorie] = useState(false);
  const [device, setDevice] = useState('');
  

  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
 

   useEffect(() => {
    console.log("useEffect snippetsList");
    const imageRef = firebase.database().ref("snippets");
    imageRef.on("value", (snapshot) => {
      console.log(snapshot.val());

      const snippets = snapshot.val();
      const snippetsList: ISnippet[] = [];
      for (let objName in snippets) {
        console.log('forloop objName', objName)
        snippetsList.push({ objName: objName, id: objName, ...snippets[objName] });
      }
      console.log(snippetsList);
      setSnippetsList(snippetsList);
      setFilterSnippetsList(snippetsList)
      const allcurrentCategories: string[] = ["alle opdrachten", ...Array.from(new Set(snippetsList.map((item) => item.categorie)))];
      setAllCategories(allcurrentCategories);
    });

    if (viewportWidth >= 900 ) {
        setToggleCategorie(true);
        setDevice('desktop')
     } else {
         setToggleCategorie(false);
        setDevice('mobile')
     }
  }, []);
  
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
        {snippetControl.openUpdate && <UpdateSnippet currentSnippet={currentSnippet} setCurrentSnippet={setCurrentSnippet} snippetControl={snippetControl} setSnippetControl={setSnippetControl}/> }
        <div className="snippets">
            <div className="container">
                <h2>snippets</h2> 
                

                <div className="snippetslist">
                    <div className="container container__snippetslist">
                        { device === "mobile" &&
                        <div className={`filter ${device}`} onClick={() => {setToggleCategorie(!toggleCategorie)}}>{currentCategorie === 'alle opdrachten' ? `gebruik een filter` : `huidige filter: ${currentCategorie} `} </div>
                        }                           
                        {toggleCategorie &&
                            <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                <>
                                <div className={`btn-categories ${determineColor(categorie)} ${device}`} onClick={() => handleFiltersnippetsList(categorie)}>{categorie}</div>
                                </>

                            ))}
                        </div>
                        }
                        <div className="snippets">
                            {filterSnippetsList && filterSnippetsList.map((snippet) => (
                                <>
                                <Snippet snippet={snippet} snippetControl={snippetControl} setSnippetControl={setSnippetControl} currentSnippet={currentSnippet} setCurrentSnippet={setCurrentSnippet}/>
                                </>
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
