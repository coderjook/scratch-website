import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";
import { IInputState} from './UploadSnippet';
import AnimatedGifList from './AnimatedGifList';
import { IItem, allItemsGif} from '../../util/getFromFirebase';
import {ISnippet} from './SnippetsList';

  type UpdateSnippetProps = {
    snippet :ISnippet
    openUpdateSnippet: boolean
    setOpenUpdateSnippet: React.Dispatch<React.SetStateAction<boolean>>
  }

  const initialInputState : IInputState = {
    omschrijving: "",
    titel: "",
    leerdoelen: "",
    categorie: "",
    scratchUrl: "",
    gifName: "",
    gifUrl: ""
  };

export default function UpdateSnippet(props: UpdateSnippetProps) {

 const {snippet, openUpdateSnippet, setOpenUpdateSnippet} = props
  const [allItems, setAllItems] = useState<IItem[]>([]);
  const [openAnimatedGifList, setOpenAnimatedGifList] = useState(false)
  
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie,scratchUrl, gifName, gifUrl } = eachEntry;
  const [promptDelete, setPromptDelete] = useState(false);

  useEffect(() => {
    setEachEntry({
      ...eachEntry,
      titel: snippet.titel,
      omschrijving: snippet.omschrijving,
      categorie: snippet.categorie,
      leerdoelen: snippet.leerdoelen,
      scratchUrl: snippet.scratchUrl,
      gifName: snippet.gifName,
      gifUrl: snippet.gifUrl
    });
  }, []);

  const updateSnippet = () => {
    const snippetRef = firebase.database().ref("snippets").child(snippet.id.toString());
    snippetRef.update({
      titel: titel,
      omschrijving: omschrijving,
      categorie: categorie,
      leerdoelen: leerdoelen,
      scratchUrl: scratchUrl,
      gifName: gifName,
      gifUrl: gifUrl
  
    }); 
  };

  const handleGif = () => {
        setAllItems(allItemsGif)
        setOpenAnimatedGifList(true);
  }

  const deleteSnippet = () => {
    const deleteSnippetRef = firebase.database().ref("snippets").child(snippet.id.toString());
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };
  
  const handleInputChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
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
        
        <h2>wijzig snippet</h2>
        
        {openAnimatedGifList && <AnimatedGifList allItems={allItems} eachEntry={eachEntry} setEachEntry={setEachEntry} setOpenAnimatedGifList={setOpenAnimatedGifList} />}

        <form className="form" onSubmit={updateSnippet}>
          <div className="inputfield">
            <label >Kies Animated Gif</label>
            <div onClick={handleGif} className="btn">bekijk animated gifs</div>
            <div>{eachEntry.gifName ? `gekozen gif: ${eachEntry.gifName}` : `geen gif gekozen`}</div>
          </div>
         
         {/* {snippet.gifUrl ? <p>wijzig animated gif</p> : <p>voeg animated gif toe</p>} */}

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
         
         
          <div className="btn" onClick={() => setOpenUpdateSnippet(false)}>sluiten</div>
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