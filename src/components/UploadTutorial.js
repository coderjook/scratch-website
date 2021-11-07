import React,{useState, useEffect} from 'react';
import firebase from "./../firebase/firebase";
import { storage } from "./../firebase/firebase";

export default function UploadTutorial() {
    const [title, setTitle] = useState("");
  const initialInputState = {
    omschrijving: "",
    titel: "",
    leerdoelen: "",
    categorie: "",
    pdfName: "",
    pdfUrl: "",
    scratchUrl: ""
  };

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    if (file) {
      handleUpload();
    } else {
      console.log("er gaat iets mis met het wegschrijven van de pdf");
    }
  }, [file]);


  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  console.log("file", file);

  const handleUpload = () => {
    const upLoadTask = storage.ref(`tutorials/${file.name}`).put(file);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("tutorials")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setEachEntry({ ...eachEntry, pdfUrl: url, pdfName: file.name });
          });
      }
    );
  };

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    console.log("final submit");
    console.log('each entry:',eachEntry)
    const pdfRef = firebase.database().ref("tutorials");
    pdfRef.push(eachEntry);
    setFile(null);
    setEachEntry(initialInputState);
  };

  return (
    <>
      <div className="container">
        <div className="title">Voeg tutorial toe</div>

        <div className="form">
          <div class="inputfield">
            <p>
              <label for="imgUrl">Kies pdf</label>
            </p>
            <input
              className="file"
              type="file"
              name="imgUrl"
              id="exampleFile"
              onChange={onFileChange}
            />
          </div>

           <div class="inputfield">
            <label for="titel">Titel</label>

            <input
              type="text"
              class="input"
              name="titel"
              placeholder="titel"
              onChange={handleInputChange}
              value={titel}
            ></input>
          </div>

           <div class="inputfield">
            <label for="leerdoelen">leerdoelen</label>

            <input
              type="text"
              class="input"
              name="leerdoelen"
              placeholder="leerdoelen"
              onChange={handleInputChange}
              value={leerdoelen}
            ></input>
          </div>
         
        
         <div class="inputfield">
            <label for="omschrijving">Omschrijving</label>
            <textarea
              className="textarea"
              name="omschrijving"
              placeholder="omschrijving handleiding"
              onChange={handleInputChange}
              value={omschrijving}
            ></textarea>
          </div>

           <div class="inputfield">
            <label for="type">Categorie</label>

        <div class="custom_select">
              <select
                name="categorie"
                onChange={handleInputChange}
                value={categorie}
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

         <div class="inputfield">
            <label for="scratchUrl">Scratch Url</label>

            <input
              type="text"
              class="input"
              name="scratchUrl"
              placeholder="scratchUrl"
              onChange={handleInputChange}
              value={scratchUrl}
            ></input>
          </div>

          <div class="inputfield">
            <input
              type="submit"
              value="Voeg toe"
              class="btn"
              onClick={handleFinalSubmit}
            />
          </div>
        </div>
        </div>
     
    </>
  );
}
