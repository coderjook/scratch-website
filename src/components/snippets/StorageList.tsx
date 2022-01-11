import React, { useState, useEffect, useContext} from 'react';
import { storage } from "../../util/firebase";
import { IItem} from './Interfaces';
import { ContextType} from './Interfaces';
import {SnippetContext} from '../../util/snippetContext';

type StorageListProps = {
  allItems : IItem[]
  // eachEntry : any
  // setEachEntry : any 
}

export default function StorageList(props : StorageListProps) {

  const {currentSnippet, setCurrentSnippet, setSnippetControl, snippetControl } = useContext(SnippetContext) as ContextType

  const {allItems} = props

  const [currentFile, setCurrentFile] = useState({fileName: 'geen file', fileUrl: 'geen fileUrl'});
  const [newFile, setNewFile] = useState<any | null>(null)
  // const [newFileName, setNewFileName] = useState<string>('')

  useEffect(() => { 
    console.log('useEffect snippetlist allItems:', allItems)
  },[])

  const closeList = () => {
    console.log('currentFile:',currentFile);    
    if (!newFile) {
      if ( currentFile.fileName === 'geen file' ) {
      setCurrentSnippet({...currentSnippet, pdfName: "", pdfUrl: ""})
      } else if (snippetControl.storageName === 'snippet')
      {
      setCurrentSnippet({...currentSnippet, pdfName: currentFile.fileName, pdfUrl: currentFile.fileUrl})
      } else if (snippetControl.storageName === 'gif') {
        setCurrentSnippet({ ...currentSnippet, gifUrl: currentFile.fileUrl, gifName: currentFile.fileName})
      }
    } else {
      handleUploadFile();   
    }
    setSnippetControl({...snippetControl, openList:false});
    
  }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>,itemName :string, itemUrl: string) => {
      console.log(itemName, itemUrl, 'e.target.checked:',e.target.checked);
      const target = e.target;
      if (target.checked) {
        console.log(itemName, itemUrl);
        setCurrentFile({ fileName: itemName, fileUrl:itemUrl });
      }
    }

   const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) : void => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const currentFile : any  = input.files[0];
    // const currentFileName : string = input.files[0].name;
    setNewFile(currentFile);
    // setNewFileName(currentFileName);
  };

  const handleUploadFile = () => {
    const upLoadTask = storage.ref(`${snippetControl.storageName}/${newFile.name}`).put(newFile);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(snippetControl.storageName)
          .child(newFile.name)
          .getDownloadURL()
          .then((url) => {
            console.log(snippetControl.storageName, ':',url);
            if (snippetControl.storageName === 'snippet') {
            setCurrentSnippet({ ...currentSnippet, pdfUrl: url, pdfName: newFile.name });
            } else if (snippetControl.storageName === 'gif') {
            setCurrentSnippet({ ...currentSnippet, gifUrl: url, gifName: newFile.name })}
          });
      }
    );
  };


      return (
        <>
          <div className='modal'>
          <section className="storagelist">
            <div className='container'>
              <div className='form'>
              <h1>Snippet  list</h1>
          
              <form >
                <div  className="storagelistitem row">
                <input type="radio" id='geen file'
                  name="file" value='geen file' onChange={(e) => handleChange(e,'geen file','geen fileUrl')}/>
                  <label htmlFor='geen file'>geen file</label>
                </div>

                {allItems && allItems.map((item, index) => {
                  return (
                    <div key={index} className="storagelistitem row">
                      <input type="radio" id={item.itemName}
                        name="item" value={item.itemName} onChange={(e) => handleChange(e,item.itemName,item.itemUrl)}/>
                      <label htmlFor={item.itemName}>{item.itemName}</label>
                      <img src={item.itemUrl} alt={item.itemName} />
                      <a href={item.itemUrl} target="_blank" className="img" rel="noopener">bekijk grote afbeelding</a>
                    </div>
                          );
                })}
        
              </form>
          
              <h3>juiste afbeelding niet gevonden? voeg toe uit bestand</h3>
              <form>
                <div className="inputfield">
                <label htmlFor="imgUrl">Kies afbeelding</label>
                <input
                  className="file"
                  type="file"
                  name="imgUrl"
                  id="exampleFile"
                  onChange={onFileChange}
                />
                </div> 

              </form>
              <div onClick={closeList} className="btn">opslaan en sluiten</div>
              </div>
            </div>
          </section>
          </div>
        </>
    )
}
