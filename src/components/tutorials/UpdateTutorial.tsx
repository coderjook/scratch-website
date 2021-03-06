import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";

import { ITutorial} from './TutorialsList';
import { IInputState} from './UploadTutorial'


// wanneer gebruik je type en wanneer gebruik je een interface?

type UploadTutorialProps = {
   tutorial: ITutorial
   openUpdateTutorial : boolean
   setOpenUpdateTutorial : React.Dispatch<React.SetStateAction<boolean>>
}

const initialInputState: IInputState = {
  titel: "",
  omschrijving: "",
  leerdoelen: "",
  categorie: "",
  scratchUrl: ""
};


export default function UploadTutorial(props : UploadTutorialProps) {
  
  const {tutorial, openUpdateTutorial, setOpenUpdateTutorial} = props;

  const [eachEntry, setEachEntry] = useState<IInputState>(initialInputState);
  const [promptDelete, setPromptDelete] = useState<boolean>(false);
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
    console.log('tutorial.id:',tutorial.id)
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
  
    const deleteTutorialRef = firebase.database().ref("tutorials").child(tutorial.objName);
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

const handleInputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  
  const handleInputChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };



  return (
    <>
    { openUpdateTutorial &&
    <div className='modal'>
    <section className="update-tutorials">
      <div className="container">
        
        <h2>wijzig tutorial toe</h2>

        <form className="form" onSubmit={updateTutorial}>
         
         

          {Object.keys(initialInputState).map((inputName, index) => {
            return (            
            inputName === 'categorie'
            ?
              <div className="inputfield" key={index}>
                <label htmlFor="type">{inputName}</label>
                <div className="custom_select">
                  <select
                    name={inputName}
                    onChange={handleInputChangeSelect}
                    value={eachEntry[inputName]}
                  >
                    <option value="">-kies-</option> 
                    <option value="basis-opdracht">basis-opdracht</option>
                    <option value="basis-spel">basis-spel</option>
                    <option value="start">start-basis</option>
                    <option value="vervolg-opdracht">vervolg-opdracht</option>
                    <option value="vervolg-spel">vervolg-spel</option>
                  </select>
                </div>
              </div>
              :
                <div className="inputfield" key={index}>
                  <label htmlFor={inputName}>{inputName}</label>
                  <textarea
                      // type={`${inputName === 'imgUrl' ? 'file': 'textarea'}`}
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChangeTextArea}
                      value={eachEntry[inputName]}
                  ></textarea>
                </div>

                //      <div className="inputfield" key={index}>
                //   <label htmlFor={inputName}>{inputName}</label>
                //   <input
                //       type={`${inputName === 'imgUrl' ? 'file': 'text'}`}
                //       className="input"
                //       name={inputName}
                //       placeholder={inputName}
                //       onChange={handleInputChange}
                //       value={eachEntry[inputName]}
                //   ></input>
                // </div>
            
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