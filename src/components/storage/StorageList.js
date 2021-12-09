import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";

let currentItemsSnippets = [];
let currentItemsGif = [];
export default function StorageList() {


const [allItems, setAllItems] = useState([]);

  useEffect(() => { 
  getFromFirebaseGif();
  getFromFirebaseSnippets();
  }, [])




const getFromFirebaseSnippets = () => {
   
    
        let storageRef = storage.ref().child('snippets/');
        storageRef.listAll().then(function (res) {
         console.log(res.items, 'res items')
          res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
               currentItemsSnippets.push(currentItem);
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });
   
};

const getFromFirebaseGif = () => {
   
        let storageRef = storage.ref().child('gif/');
        storageRef.listAll().then(function (res) {
         console.log(res.items, 'res items')
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


    const deleteFromFirebase = (url) => {
     let pictureRef = storage.refFromURL(url); 
     pictureRef.delete()
      .then(() => {     
        setAllItems(allItems.filter((item) => item !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const handleSnippets = () => {
        setAllItems(currentItemsSnippets)
    }

     const handleGif = () => {
        setAllItems(currentItemsGif)
    }

    return (
        <div>
            <div className="storagelist">

            <div onClick={handleSnippets} className="btn">bekijk jpg scripts</div>
            <div onClick={handleGif} className="btn">bekijk animated gif</div>
           
     {allItems && allItems.map((item, index) => {
         console.log('item.itemName: ',item.itemName)
        return (
           <div key={index} className="storagelistitem row">
              <div className="name"> {item.itemName}</div>
              <img src={item.itemUrl} alt={item.itemName} />
              <a href={item.itemUrl} target="_blank" className="img">bekijk grote afbeelding</a>
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
