import React, { useState} from 'react';
import { storage } from "../../util/firebase";
import { IItem } from '../../util/getFromFirebase'

type storageListProps = {
  allItemsSnippets : IItem[]
  allItemsGif : IItem[]
}
export default function StorageList({allItemsSnippets, allItemsGif} : storageListProps ) {


const [allItems, setAllItems] = useState<IItem[]>([]);

  const deleteFromFirebase = (url :string) => {
     let pictureRef = storage.refFromURL(url); 
     pictureRef.delete()
      .then(() => {     
        setAllItems(allItems.filter((item) => item.itemUrl !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const handleSnippets = () => {
        setAllItems(allItemsSnippets)
    }

     const handleGif = () => {
        setAllItems(allItemsGif)
    }

    return (
        <div>
            <div className="storagelist">

              <div onClick={handleSnippets} className="toggle">bekijk jpg scripts</div>
              <div onClick={handleGif} className="toggle">bekijk animated gif</div>
            
              {allItems && allItems.map((item, index) => {
                  console.log('item.itemName: ',item.itemName)
              return (
                  <div key={index} className="storagelistitem row">
                    <div className="name"> {item.itemName}</div>
                    <img src={item.itemUrl} alt={item.itemName} />
                    <a href={item.itemUrl} target="_blank" className="img" rel="noreferrer">bekijk grote afbeelding</a>
                    <div onClick={() => deleteFromFirebase(item.itemUrl)} className="btn">
                    verwijder
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
    )
}
