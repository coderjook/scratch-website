import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import AnimatedGifList from './AnimatedGifList';
import "./../../css/form.css";

export interface IInputState {
  [propertyName: string]: string;
}

const initialInputState : IInputState = {
    titel: "",
    omschrijving: "",    
    leerdoelen: "",
    categorie: "",
    pdfName: "",
    pdfUrl: "",
    gifName: "",
    gifUrl: "",
    scratchUrl: ""
  };

 export interface IItem {
      itemUrl: string
      itemName: string
              
  }

let currentItemsSnippets = [];
let currentItemsGif : IItem[] = [];


export default function UploadSnippet() {
    
  

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [allItems, setAllItems] = useState<IItem[]>([]);
  const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
  const [openAnimatedGifList, setOpenAnimatedGifList] = useState(false)
  const [file, setFile] = useState<any>(null)
  const [fileName, setFileName] = useState<string>('');
  const [gif, setGif] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(() => {console.log('eachEntry', eachEntry)}, [eachEntry])
  // haal de animated gif op van firebase storage gif/
  useEffect(() => {
    getFromFirebaseGif();    
  }, [])

  useEffect(() => {
    if (file) {
      handleUpload();
    } else {
      console.log("er gaat iets mis met het wegschrijven van de afbeelding");
    }
  }, [file]);


   const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) : void => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const currentFile : any  = input.files[0];
    const currentFileName : string = input.files[0].name;
    setFile(currentFile);
    setFileName(currentFileName);
  };

const getFromFirebaseGif = () => {
   
        let storageRef = storage.ref().child('gif/');
        storageRef.listAll().then(function (res) {
            res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
               currentItemsGif.push(currentItem);
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });
   
};



  const handleGif = () => {
        setAllItems(currentItemsGif)
        setOpenAnimatedGifList(true);
  } 

  const handleUpload = () => {
    const upLoadTask = storage.ref(`snippets/${fileName}`).put(file);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("snippets")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setEachEntry({ ...eachEntry, pdfUrl: url, pdfName: fileName });
          });
      }
    );
  };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleInputChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = () => {
    console.log('each entry:',eachEntry)
    const pdfRef = firebase.database().ref("snippets");
    pdfRef.push(eachEntry);
    setFile(null);
    setEachEntry(initialInputState);
  };

  return (
    <>
    <section className="upload-snippets">
      <div className="container">
        
        {openAnimatedGifList && <AnimatedGifList allItems={allItems} eachEntry={eachEntry} setEachEntry={setEachEntry} setOpenAnimatedGifList={setOpenAnimatedGifList} />}
  
        <h2>Voeg codesnippet toe</h2>

        <form className="form" onSubmit={handleFinalSubmit}>
         
          <div className="inputfield">
            <label htmlFor="imgUrl">Kies jpg code</label>
            <input
              className="file"
              type="file"
              name="imgUrl"
              onChange={onFileChange}
            />
          </div>   
           
            
            <div className="inputfield">
            <label >Kies Animated Gif</label>
            <div onClick={handleGif} className="btn">bekijk animated gifs</div>
            <div>{eachEntry.gifName ? `gekozen gif: ${eachEntry.gifName}` : `geen gif gekozen`}</div>
          </div>
   

          


      {Object.keys(initialInputState).map((inputName) => {
        return (
            inputName.includes('pdf') || inputName.includes('gif') ? <></> :
            inputName === 'categorie'
            ?
              <div className="inputfield">
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
                <div className="inputfield">
                  <label htmlFor={inputName}>{inputName}</label>
                  <input
                      type='text'
                      className="input"
                      name={inputName}
                      placeholder={inputName}
                      onChange={handleInputChange}
                      value={eachEntry[inputName]}
                  ></input>
                </div>
            
            )
        } )}
       
            <input type='submit' value='voeg toe' className="btn btn-form"/>
          
        </form>

        </div>
        </section>
  
     
    </>
  );
}
