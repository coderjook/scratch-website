import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";


export default function UpdateSnippet({snippet, openUpdateSnippet, setOpenUpdateSnippet}) {
  
  const initialInputState = {
    omschrijving: "",
    titel: "",
    leerdoelen: "",
    categorie: "",
    scratchUrl: ""
  };

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie,scratchUrl } = eachEntry;
  const [promptDelete, setPromptDelete] = useState(false);

  useEffect(() => {
    setEachEntry({
      ...eachEntry,
      titel: snippet.titel,
      omschrijving: snippet.omschrijving,
      categorie: snippet.categorie,
      leerdoelen: snippet.leerdoelen,
      scratchUrl: snippet.scratchUrl
    });
  }, []);

  const updateSnippet = () => {
    const snippetRef = firebase.database().ref("snippets").child(snippet.id);
    snippetRef.update({
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      leerdoelen: leerdoelen,
      scratchUrl: scratchUrl
  
    });
  };

  const deleteSnippet = () => {
    const deleteSnippetRef = firebase.database().ref("snippets").child(snippet.id);
    deleteSnippetRef.remove();
    const snippetStorageRef = storage.ref(`snippets/${snippet.pdfName}`);
    snippetStorageRef
      .delete()
      .then(function () {
        console.log(" File deleted successfully ");
        setOpenUpdateSnippet(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  
  // const toggle = () => {
  //   setOpenSnippetUpdate(!openSnippetUpdate);
  // };

  return (
    <>
    { openUpdateSnippet &&
    <div className='modal'>
    <section className="update-snippets">
      <div className="container">
        
        <h2>wijzig snippet toe</h2>

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
                <option value="besturing">besturing</option>
                <option value="beweging">beweging</option>
                <option value="spelelement">spelelement</option> 
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

          <div className='row'>
          {/* <div className="inputfield"> */}
            <input
              type="submit"
              value="wijzig"
              className="btn"
              onClick={updateSnippet}
            />
          {/* </div> */}
          
          <div className="btn" onClick={() => setOpenUpdateSnippet(false)}>sluiten</div>
          <div className="btn" onClick={() => setPromptDelete(true)}>verwijderen</div>
          {promptDelete && <>weet je het zeker? <div className="link txt-orange" onClick={deleteSnippet}>ja</div> / <div className="link" onClick={() => setPromptDelete(false)}>nee</div></>}
          </div>
          &#65039;
        </div>
        </div>
        </section>
        </div>
    }
    </>
  );
    
}