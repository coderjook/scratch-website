import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";
import { IItem } from '../../util/getFromFirebase';
import {ISnippetControl, ISnippet} from './Interfaces';

type StorageListProps = {
  allItems : IItem[]
  currentSnippet : ISnippet
  snippetControl: ISnippetControl
  setSnippetControl: any
  setCurrentSnippet : any 
}

export default function StorageList(props : StorageListProps) {

  const {allItems, currentSnippet, setCurrentSnippet, setSnippetControl, snippetControl} = props

  const [changeFile, setChangeFile] = useState({fileName: 'geen file', fileUrl: 'geen fileUrl'});
  const [newFile, setNewFile] = useState<any | null>(null)
  const [newFileName, setNewFileName] = useState<string>('')

  useEffect(() => {
    console.log('useEffect snippetlist allItems:', allItems)
  },[])

  const closeList = () => {
    console.log('changeFile:',changeFile);    
    if (!newFile) {
      if ( changeFile.fileName === 'geen file' ) {
      setCurrentSnippet({...currentSnippet, pdfName: "", pdfUrl: ""})
      } else if (snippetControl.storageName === 'snippet')
      {
      setCurrentSnippet({...currentSnippet, pdfName: changeFile.fileName, pdfUrl: changeFile.fileUrl})
      } else if (snippetControl.storageName === 'gif') {
        setCurrentSnippet({ ...currentSnippet, gifUrl: changeFile.fileUrl, gifName: changeFile.fileName})
      }
    } else {
      handleUploadFile();   
    }
    setSnippetControl({...snippetControl, openList:false});
    console.log('close snippetlist each entry:', currentSnippet)
  }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>,itemName :string, itemUrl: string) => {
      console.log(itemName, itemUrl, 'e.target.checked:',e.target.checked);
      const target = e.target;
      if (target.checked) {
        console.log(itemName, itemUrl);
        setChangeFile({ fileName: itemName, fileUrl:itemUrl });
      }
    }

   const onFileChange = (e: React.ChangeEvent<HTMLInputElement> ) : void => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const changeFile : any  = input.files[0];
    const changeFileName : string = input.files[0].name;
    setNewFile(changeFile);
    setNewFileName(changeFileName);
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
                      <a href={item.itemUrl} target="_blank" className="img">bekijk grote afbeelding</a>
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
