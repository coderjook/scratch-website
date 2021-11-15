import react, { useEffect, useState } from "react";
import firebase from "./../../util/firebase";
import Tutorial from './Tutorial';

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState([]);
  const [filterTutorialsList, setFilterTutorialsList] = useState(tutorialsList);
  const [allCategories, setAllCategories] = useState([]);
  const [currentCategorie, setCurrentCategorie] = useState('alle opdrachten');
  const [toggleCategorie, setToggleCategorie] = useState(false);
  const [device, setDevice] = useState('');
  

  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
 

   useEffect(() => {
    console.log("useEffect tutorialsList");
    const imageRef = firebase.database().ref("tutorials");
    imageRef.on("value", (snapshot) => {
      console.log(snapshot.val());

      const tutorials = snapshot.val();
      const tutorialsList = [];
      for (let id in tutorials) {
        tutorialsList.push({ id, ...tutorials[id] });
      }
      console.log(tutorialsList);
      setTutorialsList(tutorialsList);
      setFilterTutorialsList(tutorialsList)
      const allCategories = ["alle opdrachten", ...new Set(tutorialsList.map((item) => item.categorie))];
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
  
    const handleFilterTutorialsList = (categorie) => {
        if (categorie === "alle opdrachten") {
        setFilterTutorialsList(tutorialsList);
        setCurrentCategorie(categorie);
         if ( device === 'mobile') {
            setToggleCategorie(!toggleCategorie)
        }
        return;
        }
        const newTutorialsList = tutorialsList.filter((tutorial) => tutorial.categorie === categorie);
        setFilterTutorialsList(newTutorialsList);
        setCurrentCategorie(categorie);
        
         if ( device === 'mobile') {
            setToggleCategorie(!toggleCategorie)
        }
    };

    const determineColor = (categorie) => {
        return   categorie.substring(0, categorie.indexOf("-"))
    }

    return (
        <div className="tutorials">
            <div className="container">
                <h2>tutorials</h2> 
                

                <div className="tutorialslist">
                    <div className="container container__tutorialslist">
                        { device === "mobile" &&
                        <div className={`filter ${device}`} onClick={() => {setToggleCategorie(!toggleCategorie)}}>{currentCategorie === 'alle opdrachten' ? `gebruik een filter` : `huidige filter: ${currentCategorie} `} </div>
                        }                           
                        {toggleCategorie &&
                            <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                <>
                                <div className={`btn-categories ${determineColor(categorie)} ${device}`} onClick={() => handleFilterTutorialsList(categorie)}>{categorie}</div>
                                </>

                            ))}
                        </div>
                        }
                        <div className="tutorials">
                            {filterTutorialsList && filterTutorialsList.map((tutorial) => (
                                <>
                                <Tutorial tutorial={tutorial} />
                                 
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
