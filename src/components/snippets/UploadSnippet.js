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


export default function UploadSnippet() {
    
  

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
  const [openAnimatedGifList, setOpenAnimatedGifList] = useState(true)
  const [file, setFile] = useState(null);
  const [gif, setGif] = useState(null);
  const [error, setError] = useState(null);
 

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

  console.log("file", file);

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

        {openAnimatedGifList && <AnimatedGifList />}
        
        <h2>Voeg codesnippet toe</h2>

        <form className="form" onSubmit={handleFinalSubmit}>
         
          <div className="inputfield">
            <label for="imgUrl">Kies pdf</label>
            <input
              className="file"
              type="file"
              name="imgUrl"
              id="exampleFile"
              onChange={onFileChange}
            />
          </div>   

          <div className="inputfield">
            <label for="imgUrl">Kies Animated Gif</label>
            <input
              className="file"
              type="file"
              name="gifUrl"
              id="exampleFile"
              onChange={onGifChange}
            />
          </div>   

          <div className='inputfield' onClick={() => setOpenAnimatedGifList(true)}>kies animated gif</div> 


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
