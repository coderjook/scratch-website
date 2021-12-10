import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";


export default function AnimatedGifList({allItems, eachEntry, setEachEntry, setOpenAnimatedGifList, openAnimatedGifList}) {

  const [currentGif, setCurrentGif] = useState({gifName: 'geen gif', gifUrl: 'geen gifUrl'});
  const [newGif, setNewGif] = useState(null)

  useEffect(() => {
    console.log('useEffect animatedgiflist allItems:', allItems)
  },[])

  const closeList = () => {
    console.log('currentGif:',currentGif);
    
    if (!newGif) {
      if ( currentGif.gifName === 'geen gif' ) {
    setEachEntry({...eachEntry, gifName: "", gifUrl: ""})
    } else {
      setEachEntry({...eachEntry, gifName: currentGif.gifName, gifUrl: currentGif.gifUrl})
    }} else {
      handleUploadGif();
    }
    setOpenAnimatedGifList(false);
  }

    const handleChange = (e,itemName, itemUrl) => {
      console.log(itemName, itemUrl, 'e.target.checked:',e.target.checked);
    const target = e.target;
      if (target.checked) {
        console.log(itemName, itemUrl);
        setCurrentGif({ gifName: itemName, gifUrl:itemUrl });
        
      }
    }

    const onGifChange = (e) => {
    setNewGif(e.target.files[0]);
  };


     const handleUploadGif = () => {
    const upLoadTask = storage.ref(`gif/${newGif.name}`).put(newGif);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("gif")
          .child(newGif.name)
          .getDownloadURL()
          .then((url) => {
            console.log('gif:',url);
            setEachEntry({ ...eachEntry, gifUrl: url, gifName: newGif.name });
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
               <label for='geen gif'>geen gif</label>
            </div>

            {allItems && allItems.map((item, index) => {
              return (
                <div key={index} className="storagelistitem row">
                  <input type="radio" id={item.itemName}
                    name="gif" value={item.itemName} onChange={(e) => handleChange(e,item.itemName,item.itemUrl)}/>
                  <label for={item.itemName}>{item.itemName}</label>
                  <img src={item.itemUrl} alt={item.itemName} />
                  <a href={item.itemUrl} target="_blank" className="img">bekijk grote afbeelding</a>
                </div>
                      );
            })}
     
          </form>
          
          <h3>animated gif niet gevonden? voeg toe uit bestand</h3>
          <form>
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

          </form>
          <div onClick={closeList} className="btn">opslaan en sluiten</div>
          </div>
          </div>
          </section>
          </div>
        </>
    )
}
