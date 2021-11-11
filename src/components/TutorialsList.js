import react, { useEffect, useState } from "react";
import firebase from "../util/firebase";
import Tutorial from './tutorials/Tutorial';

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState([]);
  const [filterTutorialsList, setFilterTutorialsList] = useState(tutorialsList);
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState();
  const [currentCategorie, setCurrenCategorie] = useState("alle")
 

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
      const allCategories = ["all", ...new Set(tutorialsList.map((item) => item.categorie))];
      setAllCategories(allCategories);
    });
  }, []);
  
//    useEffect(() => {
//     console.log("useEffect imageList voor categorien", filterTutorialsList);
//     handleCategorie();
//   }, [currentCategorie]);



    return (
        <div className="tutorials">
            <div className="container">
                <h2>tutorials</h2> 
                

                <div className="tutorialslist">
                    <div className="container container__tutorialslist">
                        <div className="categories row">
                            {allCategories && allCategories.map((categorie) => (
                                <>
                                <div className="btn-categories">{categorie}</div>
                                </>

                            ))}
                        </div>
                        <div className="tutorials">
                            {tutorialsList && tutorialsList.map((tutorial) => (
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
