import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
import "./../../css/form.css";

export default function UploadSnippet() {
    
  const initialInputState = {
    omschrijving: "",
    titel: "",
    leerdoelen: "",
    categorie: "",
    pdfName: "",
    pdfUrl: "",
    gifName: "",
    gifUrl: "",
    scratchUrl: ""
  };

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
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
        
        <h2>Voeg codesnippet toe</h2>

        <div className="form">
         
          <div className="inputfield">
            <label for="imgUrl">Kies img</label>
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

          <div className="inputfield">
            <input
              type="submit"
              value="Voeg toe"
              className="btn btn-form"
              onClick={handleFinalSubmit}
            />
          </div>
        </div>
        </div>
        </section>
     
    </>
  );
}
