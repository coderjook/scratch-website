import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import "./../../css/form.css";


export default function UploadTutorial({tutorial, openUpdateTutorial, setOpenUpdateTutorial}) {
  
  const initialInputState = {
    omschrijving: "",
    titel: "",
    leerdoelen: "",
    categorie: "",
    scratchUrl: ""
  };

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie,scratchUrl } = eachEntry;

  useEffect(() => {
    setEachEntry({
      ...eachEntry,
      titel: tutorial.titel,
      omschrijving: tutorial.omschrijving,
      categorie: tutorial.categorie,
      leerdoelen: tutorial.leerdoelen,
      scratchUrl: tutorial.scratchUrl
    });
  }, []);

  const updateTutorial = () => {
    const tutorialRef = firebase.database().ref("tutorials").child(tutorial.id);
    tutorialRef.update({
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      leerdoelen: leerdoelen,
      scratchUrl: scratchUrl
  
    });
  };

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  
  // const toggle = () => {
  //   setOpenTutorialUpdate(!openTutorialUpdate);
  // };

  return (
    <>
    { openUpdateTutorial &&
    <section className="update-tutorials">
      <div className="container">
        
        <h2>wijzig tutorial toe</h2>

        <div className="form">
         
          <div className="inputfield">
            <label for="titel">Titel</label>
            <input
              type="text"
              className="input"
              name="titel"
              placeholder="titel"
              onChange={handleInputChange}
              value={titel}
            ></input>
          </div>

           <div className="inputfield">
            <label for="leerdoelen">leerdoelen</label>
            <input
              type="text"
              className="input"
              name="leerdoelen"
              placeholder="leerdoelen"
              onChange={handleInputChange}
              value={leerdoelen}
            ></input>
          </div>
         
        
         <div className="inputfield">
            <label for="omschrijving">Omschrijving</label>
            <textarea
              className="textarea"
              name="omschrijving"
              placeholder="omschrijving handleiding"
              onChange={handleInputChange}
              value={omschrijving}
            ></textarea>
          </div>

           <div className="inputfield">
            <label for="type">Categorie</label>
            <div className="custom_select">
              <select
                name="categorie"
                onChange={handleInputChange}
                value={categorie}
              >
                <option value="">-kies-</option>
                <option value="basis-opdracht">basis-opdracht</option>
                <option value="basis-spel">basis-spel</option>
                <option value="start">start</option>
                <option value="vervolg-opdracht">vervolg-opdracht</option>
                <option value="vervolg-spel">vervolg-spel</option>
              </select>
            </div>
          </div>

         <div className="inputfield">
            <label for="scratchUrl">Scratch Url</label>
            <input
              type="text"
              className="input"
              name="scratchUrl"
              placeholder="scratchUrl"
              onChange={handleInputChange}
              value={scratchUrl}
            ></input>
          </div>

          <div className="inputfield">
            <input
              type="submit"
              value="Voeg toe"
              className="btn btn-form"
              onClick={updateTutorial}
            />
          </div>
          <button onClick={() => setOpenUpdateTutorial(false)}>sluiten</button>
        
        </div>
        </div>
        </section>
    }
    </>
  );
    
}