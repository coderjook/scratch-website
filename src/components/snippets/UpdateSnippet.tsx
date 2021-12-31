import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";
import { IInputState, ISnippet, ISnippetControl} from './Interfaces';
import StorageList from "./StorageList"
import { IItem, allItemsGif, allItemsSnippets} from '../../util/getFromFirebase';



  type UpdateSnippetProps = {
    snippetControl: ISnippetControl
    setSnippetControl: any
    currentSnippet: ISnippet
    setCurrentSnippet: any
    // openUpdateSnippet: boolean
    // setOpenUpdateSnippet: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  
  const initialInputState : IInputState = {
    titel: "",
    omschrijving: "",
    leerdoelen: "",
    categorie: "",
    scratchUrl: "",
    gifName: "",
    gifUrl: "",
    pdfName: "",
    pdfUrl: "",
  };

export default function UpdateSnippet(props: UpdateSnippetProps) {

  const {snippetControl,setSnippetControl, currentSnippet, setCurrentSnippet} = props
  const [allItems, setAllItems] = useState<IItem[]>([]);
  const [eachEntry, setEachEntry] = useState(initialInputState);
  // const { omschrijving,titel, leerdoelen, categorie,scratchUrl, gifName, gifUrl, pdfName, pdfUrl } = eachEntry;
  const { omschrijving,titel, leerdoelen, categorie,scratchUrl, gifName, gifUrl, pdfName, pdfUrl } = currentSnippet;
  const [promptDelete, setPromptDelete] = useState(false);

  useEffect(() => {
    console.log('useEffect UpdateSnippet currentSnippet: ', currentSnippet)
    // setEachEntry({
    //   ...eachEntry,
    //   titel: currentSnippet.titel,
    //   omschrijving: currentSnippet.omschrijving,
    //   categorie: currentSnippet.categorie,
    //   leerdoelen: currentSnippet.leerdoelen,
    //   scratchUrl: currentSnippet.scratchUrl,
    //   gifName: currentSnippet.gifName,
    //   gifUrl: currentSnippet.gifUrl,
    //   pdfName: currentSnippet.pdfName,
    //   pdfUrl: currentSnippet.pdfUrl,
    // });
  }, []);

  const updateSnippet = () => {
    const snippetRef = firebase.database().ref("snippets").child(currentSnippet.id.toString());
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
        setAllItems(allItemsGif)
        setSnippetControl({...snippetControl, storageName: 'gif', openList: true})
      
  }

   const handleJpg = () => {
        setAllItems(allItemsSnippets)
        setSnippetControl({...snippetControl, storageName: 'snippet', openList: true})
     
  }

  const deleteSnippet = () => {
    const deleteSnippetRef = firebase.database().ref("snippets").child(currentSnippet.id.toString());
    deleteSnippetRef.remove();
    const snippetStorageRef = storage.ref(`snippets/${currentSnippet.pdfName}`);
    snippetStorageRef
      .delete()
      .then(function () {
        console.log(" File deleted successfully ");
        setSnippetControl({...snippetControl, openUpdate: false})
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    // setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
    setCurrentSnippet({ ...currentSnippet, [e.target.name]: e.target.value });
  };
  
  const handleInputChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
    // setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
    setCurrentSnippet({ ...currentSnippet, [e.target.name]: e.target.value });
  };

  const close =() => {
    setSnippetControl({...snippetControl, openUpdate: false})
  }

  const handleFinalSubmit = () => {
    console.log('each entry:',eachEntry)
    const pdfRef = firebase.database().ref("snippets");
    // pdfRef.push(eachEntry);
     pdfRef.push(currentSnippet);
    // setEachEntry(initialInputState);
  };

  return (
    <>
    { snippetControl.openUpdate &&
    <div className='modal'>
    <section className="update-snippets">
      <div className="container">
        
        <h2>wijzig snippet</h2>
        
        {snippetControl.openList && <StorageList allItems={allItems} eachEntry={eachEntry} setEachEntry={setEachEntry} snippetControl={snippetControl} setSnippetControl={setSnippetControl} />}
        <form className="form" onSubmit={updateSnippet}>
          <div className="inputfield">
            <label >Kies Animated Gif</label>
            <div className='row fileselect'>
            <div onClick={handleGif} className="btn fileselect">bekijk animated gifs</div>
            <div className='choosenfile'>{currentSnippet.gifName ? `gekozen gif: ${currentSnippet.gifName}` : `geen gif gekozen`}</div>
            </div>
          </div>

          <div className="inputfield">
            <label >Kies CodeSnippet</label>
            <div className='row fileselect'>
            <div onClick={handleJpg} className="btn fileselect">bekijk codes</div>
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
                <div className="inputfield" key={index}>
                  <label htmlFor={inputName}>{inputName}</label>
                  <input
                      type={`${inputName === 'imgUrl' ? 'file': 'text'}`}
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChange}
                      value={currentSnippet[inputName]}
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
         
          <div className="btn" onClick={handleFinalSubmit}>toevoegen</div>
          <div className="btn" onClick={close}>sluiten</div>
          <div className="btn" onClick={() => setPromptDelete(true)}>verwijderen</div>
          {promptDelete && <>weet je het zeker? <div className="link txt-orange" onClick={deleteSnippet}>ja</div> / <div className="link" onClick={() => setPromptDelete(false)}>nee</div></>}
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