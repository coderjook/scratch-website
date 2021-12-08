import React,{useState, useEffect} from 'react';
import firebase from "../../util/firebase";
import { storage } from "../../util/firebase";
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
  scratchUrl: ""
};

export default function UploadTutorial() {
    
  const [eachEntry, setEachEntry] = useState<IInputState>(initialInputState);
  // const { omschrijving,titel, leerdoelen, categorie, pdfName, pdfUrl, scratchUrl } = eachEntry;
  const [file, setFile] = useState<ArrayBuffer | Blob | Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState(null);
 

  useEffect(() => {
    if (file) {
      handleUpload();
    } else {
      console.log("er gaat iets mis met het wegschrijven van de pdf");
    }
  }, [file]);


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) : void => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const currentFile : ArrayBuffer | Blob | Uint8Array = input.files[0];
    const currentFileName : string = input.files[0].name;
    setFile(currentFile);
    setFileName(currentFileName);
  };

  console.log("file", file);

  const handleUpload = () => {
    if (!file) {
      return
    }
    const upLoadTask = storage.ref(`tutorials/${fileName}`).put(file);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("tutorials")
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
    console.log("final submit");
    console.log('each entry:',eachEntry)
    const pdfRef = firebase.database().ref("tutorials");
    pdfRef.push(eachEntry);
    setFile(null);
    setEachEntry(initialInputState);
  };

  return (
    <>
    <section className="upload-tutorials">
      <div className="container">
        
        <h2>Voeg tutorial toe</h2>

        <form className="form" onSubmit={handleFinalSubmit}>
         
          <div className="inputfield">
            <label htmlFor="imgUrl">Kies pdf</label>
            <input
              className="file"
              type="file"
              name="imgUrl"
              id="exampleFile"
              onChange={onFileChange}
            />
          </div>       


      {Object.keys(initialInputState).map((inputName) => {
        return (
            inputName === 'pdfName' || inputName === 'pdfUrl' ? <></> :
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
                    <option value="basis-opdracht">basis-opdracht</option>
                    <option value="basis-spel">basis-spel</option>
                    <option value="start">start</option>
                    <option value="vervolg-opdracht">vervolg-opdracht</option>
                    <option value="vervolg-spel">vervolg-spel</option>
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
