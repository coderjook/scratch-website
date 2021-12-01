import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";


type UploadTutorialProps = {
    tutorial: {
      id: number
      titel: string 
      categorie: string
      leerdoelen: string 
      omschrijving: string 
      scratchUrl: string 
      pdfName: string
      pdfUrl: string
  }
 
  openUpdateTutorial : boolean
  setOpenUpdateTutorial : any

}

const initialInputState = {
  omschrijving: "",
  titel: "",
  leerdoelen: "",
  categorie: "",
  scratchUrl: ""
};


export default function UploadTutorial(props : UploadTutorialProps) {
  
  const {tutorial, openUpdateTutorial, setOpenUpdateTutorial} = props

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie,scratchUrl } = eachEntry;
  const [promptDelete, setPromptDelete] = useState(false);

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
    const tutorialRef = firebase.database().ref("tutorials").child(tutorial.id.toString());
    tutorialRef.update({
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      leerdoelen: leerdoelen,
      scratchUrl: scratchUrl
  
    });
  };

  const deleteTutorial = () => {
    const deleteTutorialRef = firebase.database().ref("tutorials").child(tutorial.id.toString());
    deleteTutorialRef.remove();
    const tutorialStorageRef = storage.ref(`tutorials/${tutorial.pdfName}`);
    tutorialStorageRef
      .delete()
      .then(function () {
        console.log(" File deleted successfully ");
        setOpenUpdateTutorial(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  
  // const toggle = () => {
  //   setOpenTutorialUpdate(!openTutorialUpdate);
  // };

  return (
    <>
    { openUpdateTutorial &&
    <div className='modal'>
    <section className="update-tutorials">
      <div className="container">
        
        <h2>wijzig tutorial toe</h2>

        <form className="form" onSubmit={updateTutorial}>
         
         

          {Object.keys(initialInputState).map((inputName : string) => {
        return (
            
            inputName === 'categorie'
            ?
              <div className="inputfield">
                <label for="type">{inputName}</label>
                <div className="custom_select">
                  <select
                    name={inputName}
                    onChange={handleInputChange}
                    value={eachEntry[inputName]}
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
              :
                <div className="inputfield">
                  <label htmlFor={inputName}>{inputName}</label>
                  <input
                      type={`${inputName === 'imgUrl' ? 'file': 'text'}`}
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChange}
                      value={eachEntry[inputName]}
                  ></input>
                </div>
            
            )
        } )}

          
        <div className='row'>
          <input
              type="submit"
              value="wijzig"
              className="btn"
             
            />
         
         
          <div className="btn" onClick={() => setOpenUpdateTutorial(false)}>sluiten</div>
          <div className="btn" onClick={() => setPromptDelete(true)}>verwijderen</div>
          {promptDelete && <>weet je het zeker? <div className="link txt-orange" onClick={deleteTutorial}>ja</div> / <div className="link" onClick={() => setPromptDelete(false)}>nee</div></>}
          </div>
          &#65039;
        </form>
        </div>
        </section>
        </div>
    }
    </>
  );
    
}