import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";
import { IItem } from '../../util/getFromFirebase';

type AnimatedGifListProps = {
  allItems : IItem[]
  eachEntry : any
  setEachEntry : any
  setOpenSnippetJpgList : React.Dispatch<React.SetStateAction<boolean>>
}

export default function AnimatedGifList(props : AnimatedGifListProps) {

  const {allItems, eachEntry, setEachEntry, setOpenSnippetJpgList} = props

  const [currentFile, setCurrentFile] = useState({fileName: 'geen file', fileUrl: 'geen fileUrl'});
  const [newFile, setNewFile] = useState<any | null>(null)
  const [newFileName, setNewFileName] = useState<string>('')

  useEffect(() => {
    console.log('useEffect animatedgiflist allItems:', allItems)
  },[])

  const closeList = () => {
    console.log('currentGif:',currentFile);
    
    if (!newFile) {
      if ( currentFile.fileName === 'geen file' ) {
      setEachEntry({...eachEntry, pdfName: "", pdfUrl: ""})
      } else {
      setEachEntry({...eachEntry, pdfName: currentFile.fileName, pdfUrl: currentFile.fileUrl})
    }} else {
      handleUploadFile();   
    }
    setOpenSnippetJpgList(false);
    console.log('close animatedgiflist each entry:', eachEntry)
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
    const currentFileName : string = input.files[0].name;
    setNewFile(currentFile);
    setNewFileName(currentFileName);
  };

  const handleUploadFile = () => {
    const upLoadTask = storage.ref(`snippets/${newFile.name}`).put(newFile);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("snippets")
          .child(newFile.name)
          .getDownloadURL()
          .then((url) => {
            console.log('snippet:',url);
            setEachEntry({ ...eachEntry, pdfUrl: url, pdfName: newFile.name });
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
              <h1>Animated gif list</h1>
          
              <form >
                <div  className="storagelistitem row">
                <input type="radio" id='geen gif'
                  name="gif" value='geen gif' onChange={(e) => handleChange(e,'geen gif','geen gifUrl')}/>
                  <label htmlFor='geen gif'>geen gif</label>
                </div>

                {allItems && allItems.map((item, index) => {
                  return (
                    <div key={index} className="storagelistitem row">
                      <input type="radio" id={item.itemName}
                        name="gif" value={item.itemName} onChange={(e) => handleChange(e,item.itemName,item.itemUrl)}/>
                      <label htmlFor={item.itemName}>{item.itemName}</label>
                      <img src={item.itemUrl} alt={item.itemName} />
                      <a href={item.itemUrl} target="_blank" className="img">bekijk grote afbeelding</a>
                    </div>
                          );
                })}
        
              </form>
          
              <h3>animated gif niet gevonden? voeg toe uit bestand</h3>
              <form>
                <div className="inputfield">
                <label htmlFor="imgUrl">Kies Animated Gif</label>
                <input
                  className="file"
                  type="file"
                  name="gifUrl"
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
