import React,{useState, useEffect, useContext} from 'react';
import firebase from "../../util/firebase";
import "./../../css/form.css";
import {ContextType, IInputState, ISnippet, ISnippetControl} from './Interfaces';
import StorageList from "./StorageList"
import { IItem} from './Interfaces';
import { SnippetContext, initialInputStateCurrentSnippet } from '../../util/snippetContext';



  const initialInputState : IInputState = {
  
    titel: "",
    omschrijving: "",
    leerdoelen: "",
    categorie: "",
    scratchUrl: ""

  };

export default function UpdateSnippet() {

  const {currentSnippet, setCurrentSnippet, snippetControl, setSnippetControl, allItemsGif, allItemsSnippets } = useContext(SnippetContext) as ContextType;
  const [allItems, setAllItems] = useState<IItem[]>([]);
  const [newItem, setNewItem] = useState<boolean>(false);
  const {omschrijving,titel, leerdoelen, categorie,scratchUrl, gifName, gifUrl, pdfName, pdfUrl } = currentSnippet;
  const [promptDelete, setPromptDelete] = useState(false);

  useEffect(() => {
    console.log('UpdateSnippet, currentSnippet: ', currentSnippet)
    if (currentSnippet.id === "0") {
      setNewItem(true)
    }
  
  }, []);

  const updateSnippet = () => {
    console.log('updateSnippet, updateSnippet, currentSnippet', currentSnippet)
    const snippetRef = firebase.database().ref("snippets").child(currentSnippet.objName);
    snippetRef.update({
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      leerdoelen: leerdoelen,
      scratchUrl: scratchUrl,
      gifName: gifName,
      gifUrl: gifUrl,
      pdfName: pdfName,
      pdfUrl: pdfUrl  
    }); 
  };

  const handleGif = () => {
        console.log('allItemsGif:', allItemsGif);
        setAllItems(allItemsGif);
        setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, storageName: 'gif', openList: true}))
  }

  const handleJpg = () => {
        console.log('allItemsSnippets:', allItemsSnippets);
        setAllItems(allItemsSnippets);
        setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, storageName: 'snippet', openList: true}))
  }

  const deleteSnippet = () => {
    const deleteSnippetRef = firebase.database().ref("snippets").child(currentSnippet.objName);
    deleteSnippetRef.remove();
    close();

  };
  const handleInputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) : void => {
    setCurrentSnippet({ ...currentSnippet, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setCurrentSnippet({ ...currentSnippet, [e.target.name]: e.target.value });
  };
  
  const handleInputChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
    setCurrentSnippet({ ...currentSnippet, [e.target.name]: e.target.value });
  };

  const close =() => {
    setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, openUpdate:false}))
    setNewItem(false)
    setCurrentSnippet(initialInputStateCurrentSnippet);
  }

  const handleUploadNewSnippet = () => {
    console.log('new currentSnippet:',currentSnippet)
    const pdfRef = firebase.database().ref("snippets");
    pdfRef.push(currentSnippet);
    setCurrentSnippet(initialInputStateCurrentSnippet);
    // setEachEntry(initialInputState);
    setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, openUpdate:false}))
  };

  // const log = () => {
  //   console.log('currenSnippet log', currentSnippet)    
  // }

  return (
    <>
    { snippetControl.openUpdate &&
    <div className='modal'>
    <section className="update-snippets">
      <div className="container">
        
        <h2>wijzig snippet</h2>
        
        {snippetControl.openList && <StorageList allItems={allItems}/>}
        <form className="form" onSubmit={updateSnippet}>
          <div className="inputfield">
            <label >Kies Animated Gif</label>
            <div className='fileselect'>
              <div onClick={handleGif} className="btn btn-blue">bekijk animated gifs</div>
              <div className='choosenfile'>{currentSnippet.gifName ? `gekozen gif: ${currentSnippet.gifName}` : `geen gif gekozen`}</div>
            </div>
          </div>

          <div className="inputfield">
            <label >Kies CodeSnippet</label>
            <div className='fileselect'>
            <div onClick={handleJpg} className="btn btn-blue">bekijk codes</div>
            <div className='choosenfile'>{currentSnippet.pdfName ? `gekozen gif: ${currentSnippet.pdfName}` : `geen code gekozen`}</div>
            </div>
          </div>
         
         {/* {currentSnippet.gifUrl ? <p>wijzig animated gif</p> : <p>voeg animated gif toe</p>} */}

          {Object.keys(initialInputState).map((inputName, index) => {
            return (            
            inputName.includes('Url') ? <> </> : inputName === 'categorie'
            ?
              <div className="inputfield" key={index}>
                <label htmlFor="type">{inputName}</label>
                <div className="custom_select">
                  <select
                    name={inputName}
                    onChange={handleInputChangeSelect}
                    value={currentSnippet[inputName]}
                  >
                    <option value="">-kies-</option>
                    <option value="besturing">besturing</option>
                    <option value="beweging">beweging</option>
                    <option value="spelelement">spelelement</option> 
                  </select>
                </div>
              </div>
              :
              <>
                    <div className="inputfield" key={index}>
                  <label htmlFor={inputName}>{inputName}</label>
                  <textarea
                      // type={`${inputName === 'imgUrl' ? 'file': 'textarea'}`}
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChangeTextArea}
                      value={currentSnippet[inputName as keyof ISnippet]}
                  ></textarea>
                </div>
                {/* <div className="inputfield" key={index}>
                  <label htmlFor={inputName}>{inputName}</label>
                  <input
                      type={`text`}
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChange}
                      value={currentSnippet[inputName as keyof ISnippet]}
                  ></input>
                </div> */}
                
              </>
            )
        } )}

          
        <div className='row'>
          {!newItem && <input
              type="submit"
              value="wijzig"
              className="btn"             
            />}
         
          {newItem  && <div className="btn" onClick={handleUploadNewSnippet}>toevoegen</div>}
          <div className="btn" onClick={close}>sluiten</div>
          {/* <div className="btn" onClick={log}>log</div> */}
          <div className="btn" onClick={() => setPromptDelete(true)}>verwijderen</div>
          
         </div>
         <div className='row'>{promptDelete && <>weet je het zeker? <div className="link txt-orange" onClick={deleteSnippet}>ja</div> / <div className="link" onClick={() => setPromptDelete(false)}>nee</div></>}</div>
          &#65039;
        </form>

     
        </div>
        </section>
        </div>
    }
    </>
  );
    
}