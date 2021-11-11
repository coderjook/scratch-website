import react, { useEffect, useState } from "react";
import firebase from "../util/firebase";
import Tutorial from './tutorials/Tutorial';

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState([]);
  const [filterTutorialsList, setFilterTutorialsList] = useState(tutorialsList);
  const [allCategories, setAllCategories] = useState([]);
 
 

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
  }, []);
  
    const handleFilterTutorialsList = (categorie) => {
        if (categorie === "alle opdrachten") {
        setFilterTutorialsList(tutorialsList);
        return;
        }
        const newTutorialsList = tutorialsList.filter((tutorial) => tutorial.categorie === categorie);
        setFilterTutorialsList(newTutorialsList);
        
    };



    return (
        <div className="tutorials">
            <div className="container">
                <h2>tutorials</h2> 
                

                <div className="tutorialslist">
                    <div className="container container__tutorialslist">
                        <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                <>
                                <div className="btn-categories" onClick={() => handleFilterTutorialsList(categorie)}>{categorie}</div>
                                </>

                            ))}
                        </div>
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
