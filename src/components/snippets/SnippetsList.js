import react, { useEffect, useState } from "react";
import firebase from "../../util/firebase";
import Snippet from './Snippet';

export default function SnippetsList() {
  const [snippetsList, setSnippetsList] = useState([]);
  const [filterSnippetsList, setFilterSnippetsList] = useState(snippetsList);
  const [allCategories, setAllCategories] = useState([]);
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
      const snippetsList = [];
      for (let id in snippets) {
        snippetsList.push({ id, ...snippets[id] });
      }
      console.log(snippetsList);
      setSnippetsList(snippetsList);
      setFilterSnippetsList(snippetsList)
      const allCategories = ["alle opdrachten", ...new Set(snippetsList.map((item) => item.categorie))];
      setAllCategories(allCategories);
    });

    if (viewportWidth >= 900 ) {
        setToggleCategorie(true);
        setDevice('desktop')
     } else {
         setToggleCategorie(false);
        setDevice('mobile')
     }
  }, []);
  
    const handleFiltersnippetsList = (categorie) => {
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

    const determineColor = (categorie) => {
        return   categorie.substring(0, categorie.indexOf("-"))
    }

    return (
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
                                <Snippet snippet={snippet} />
                                 
                                 </>
                        )
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
