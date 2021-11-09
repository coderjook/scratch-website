import react, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

export default function TutorialsList() {
  const [tutorialsList, setTutorialsList] = useState();
 

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
    //   const allTypes = ["all", ...new Set(tutorialsList.map((item) => item.type))];
    //   setTypes(allTypes);
    });
  }, []);




    return (
        <div className="tutorials">
            <div className="container">
                <h1>tutorials</h1> 
                <div className="tutorialslist">
                    <div className="container">
                {tutorialsList && tutorialsList.map((tutorial) => (
                    <>
                    
                        <div className="tutorial" key={tutorial.id}>
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
    )
}
