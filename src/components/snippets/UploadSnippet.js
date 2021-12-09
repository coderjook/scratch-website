import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import AnimatedGifList from './AnimatedGifList';
import "./../../css/form.css";

const initialInputState = {
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

let currentItemsSnippets = [];
let currentItemsGif = [];


export default function UploadSnippet() {
    
  

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [allItems, setAllItems] = useState([]);
  const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
  const [openAnimatedGifList, setOpenAnimatedGifList] = useState(false)
  const [file, setFile] = useState(null);
  const [gif, setGif] = useState(null);
  const [error, setError] = useState(null);
 

      useEffect(() => {console.log('eachEntry', eachEntry)}, [eachEntry])
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

   useEffect(() => {
    if (gif) {
      handleUploadGif();
    } else {
      console.log("er gaat iets mis met het wegschrijven van de animated gif");
    }
  }, [gif]);


  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onGifChange = (e) => {
    setGif(e.target.files[0]);
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
    const upLoadTask = storage.ref(`snippets/${file.name}`).put(file);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("snippets")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setEachEntry({ ...eachEntry, pdfUrl: url, pdfName: file.name });
          });
      }
    );
  };

   const handleUploadGif = () => {
    const upLoadTask = storage.ref(`gif/${gif.name}`).put(gif);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("gif")
          .child(gif.name)
          .getDownloadURL()
          .then((url) => {
            console.log('gif:',url);
            setEachEntry({ ...eachEntry, gifUrl: url, gifName: gif.name });
          });
      }
    );
  };

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

 

  const handleFinalSubmit = (e) => {
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
        
        {openAnimatedGifList && <AnimatedGifList allItems={allItems} eachEntry={eachEntry} setEachEntry={setEachEntry} setOpenAnimatedGifList={setOpenAnimatedGifList} openAnimatedGifList={openAnimatedGifList}/>}
  
        <h2>Voeg codesnippet toe</h2>

        <form className="form" onSubmit={handleFinalSubmit}>
         
          <div className="inputfield">
            <label for="imgUrl">Kies jpg code</label>
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
          {/* <div className="inputfield">
            <label for="gifUrl">Kies Animated Gif</label>
            <input
              className="file"
              type="file"
              name="gifUrl"
              onChange={onGifChange}
            />
          </div>    */}

          


      {Object.keys(initialInputState).map((inputName) => {
        return (
            inputName.includes('pdf') || inputName.includes('gif') ? <></> :
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
