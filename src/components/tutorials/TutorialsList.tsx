import React, { useEffect, useState, useLayoutEffect } from "react";
import firebase from "../../util/firebase";
import Tutorial from './Tutorial';

export interface ITutorial  {
    id: number
    objName: string
    titel: string 
    categorie: string
    leerdoelen: string 
    omschrijving: string 
    scratchUrl: string 
    pdfName: string
    pdfUrl: string
}

// vraag: id is in interface een number, maar met for loop stop ik er een string in. Dit wordt wel geaccepteerd..

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState<ITutorial[]>([]);
  const [filterTutorialsList, setFilterTutorialsList] = useState<ITutorial[]>(tutorialsList);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [currentCategorie, setCurrentCategorie] = useState<string>('alle opdrachten');
  const [toggleCategorie, setToggleCategorie] = useState<boolean>(false);
  const [device, setDevice] = useState<"mobile"|"desktop">("desktop");
  


       const handleResize = () => {
       
         if (window.innerWidth >= 900 ) {
            setToggleCategorie(true);
            setDevice('desktop')
        } else {
            setToggleCategorie(false);
            setDevice('mobile')
        }
    }
     

     useLayoutEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize)
    },[])

   useEffect(() => {
    console.log("useEffect tutorialslist: vraag tutorials op uit firebase/db/tutorials");
    const imageRef = firebase.database().ref("tutorials");
    imageRef.on("value", (snapshot) => {
      console.log('tutorial list: snapshot.val()',snapshot.val());
      const tutorials = snapshot.val();
    
      let tutorialsList: ITutorial[] = [];
      for (let objName in tutorials) {
        tutorialsList.push({objName: objName, id: objName, ...tutorials[objName] });       
      }
      console.log('tutorialsList:',tutorialsList);
      setTutorialsList(tutorialsList);
      setFilterTutorialsList(tutorialsList)
      let allCurrentCategories:string[] = ["alle opdrachten", ...Array.from(new Set(tutorialsList.map((item) => item.categorie))) ];
      setAllCategories(allCurrentCategories);
    });

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
        const newTutorialsList : ITutorial[] = tutorialsList.filter((tutorial) => tutorial.categorie === categorie);
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
            
            <div className="header">
                <div className="container">
                    <h2>Handleidingen</h2> 
                    <p>Zie jij hieronder een spel of een opdracht dat je wil maken? Klik op handleiding pdf en ga aan de slag.
                        Volg de instructies stap voor stap. Zo maak jij je eigen game in no time.</p>
                </div>
            </div> 
           
                
            <div className="container">
                <div className="tutorialslist">
                    <div className="container container__tutorialslist">
                        { device === "mobile" &&
                        <div className={`filter ${device}`} onClick={() => {setToggleCategorie(!toggleCategorie)}}>{currentCategorie === 'alle opdrachten' ? `gebruik een filter` : `huidige filter: ${currentCategorie} `} </div>
                        }                           
                        {toggleCategorie &&
                            <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                <>
                                <div className={`btn ${determineColor(categorie)} ${device}`} onClick={() => handleFilterTutorialsList(categorie)}>{categorie}</div>
                                </>

                            ))}
                        </div>
                        }
                        <div className="tutorials">
                            {filterTutorialsList && filterTutorialsList.map((tutorial, index) => (
                                <>
                                    <Tutorial tutorial={tutorial} key={index} />
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
