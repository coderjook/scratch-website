import react, { useEffect, useState } from "react";
import firebase from "../../util/firebase";
import Tutorial from './Tutorial';

export interface ITutorial  {
    id: number
    titel: string 
    categorie: string
    leerdoelen: string 
    omschrijving: string 
    scratchUrl: string 
    pdfName: string
    pdfUrl: string
}


export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState<ITutorial[]>([]);
  const [filterTutorialsList, setFilterTutorialsList] = useState<ITutorial[]>(tutorialsList);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [currentCategorie, setCurrentCategorie] = useState<string>('alle opdrachten');
  const [toggleCategorie, setToggleCategorie] = useState<boolean>(false);
  const [device, setDevice] = useState<string>('');
  

  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
 

   useEffect(() => {
    console.log("useEffect tutorialsList");
    const imageRef = firebase.database().ref("tutorials");
    imageRef.on("value", (snapshot) => {
      console.log(snapshot.val());

      const tutorials = snapshot.val();
      let tutorialsList: ITutorial[] = [];
      for (let id in tutorials) {
        tutorialsList.push({ id, ...tutorials[id] });
      }
      console.log(tutorialsList);
      setTutorialsList(tutorialsList);
      setFilterTutorialsList(tutorialsList)
    //   const allCategories = ["alle opdrachten", ...new Set(tutorialsList.map((item) => item.categorie))];
    // let allCurrentCategories:string[] = ["alle opdrachten", Array.from(new Set(tutorialsList.map((item) => item.categorie))) ];
      let allCurrentCategories:string[] = ["alle opdrachten", "basis-opdracht", "basis-spel" ];
      setAllCategories(allCurrentCategories);
    });

    if (viewportWidth >= 900 ) {
        setToggleCategorie(true);
        setDevice('desktop')
     } else {
         setToggleCategorie(false);
        setDevice('mobile')
     }
  }, []);
  
    const handleFilterTutorialsList = (categorie:string) : void => {
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

    const determineColor = (categorie:string) : string => {
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
