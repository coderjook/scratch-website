import react, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState();
  const [filterTutorialsList, setFilterTutorialsList] = useState(tutorialsList);
  const [allCategories, setAllCategories] = useState()
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
                <h1>tutorials</h1> 
                

                <div className="tutorialslist">
                    <div className="container">
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
                                 <div className="tutorial" key={tutorial.id}>
                                    {/* <iframe src={`${tutorial.scratchUrl}/embed`} allowtransparency="true" 
                                    width="300" height="150" frameborder="0" scrolling="no" allowfullscreen></iframe> */}
                                    <div>
                                        <img src="https://picsum.photos/300/200"/>
                                    </div>
                                    <div>
                                        {tutorial.titel}
                                    </div>
                                    <div>
                                        {tutorial.leerdoelen}
                                    </div>
                                    <div>
                                        {tutorial.categorie}
                                    </div>
                                    <div>
                                        <a href={tutorial.pdfUrl} target="_blank">{tutorial.pdfName}</a>
                                    </div>
                                    <div>
                                        <a href={tutorial.scratchUrl} target="_blank">ga naar project</a>
                                    </div>
                                  </div>
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
