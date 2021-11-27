import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";






export default function StorageList() {
// const initialInputState = {
//     itemUrl: '',
//     itemName:'',
// }

const [allItems, setAllItems] = useState([]);
// const [categorie, setCategorie] = useState('');

useEffect(() => {
    // setAllItems([]);
  getFromFirebase();
  console.log('useEffect getFromFirebase')
  }, []) 

  const deleteFromFirebase = (url) => {
    //1.
    let pictureRef = storage.refFromURL(url);
   //2.
    pictureRef.delete()
      .then(() => {
        //3.
        setAllItems(allItems.filter((item) => item !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFromFirebase = () => {
    //1. 
        let currentItems = [];
        let storageRef = storage.ref().child('snippets/');
        //2.
        storageRef.listAll().then(function (res) {
            //3.
            res.items.map((imageRef) => {
            console.log('naam afbeelding:' ,imageRef.name)
            imageRef.getDownloadURL().then((url) => {
                //4.
                let currentItem = {
                    itemUrl: url, 
                    itemName: imageRef.name 
                }
                currentItems.push(currentItem);
                console.log('currentItem:',currentItem)
            });
            console.log('currentItems:',currentItems)
        setAllItems(currentItems);

            });
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log('AllItems giflist:',allItems)
    
  };


    return (
        <div>
            <div className="storagelist">
        <h1>Animated gif list</h1>
      {allItems.map((item, index) => {
        console.log('dit is het item:', item);
        console.log('dit is het itemUrl:', item.itemUrl);
        return (
           <div key={index} className="storagelistitem row">
              <div className="name"> {item.itemName}</div>
              <img src={item.itemUrl} alt={item.itemName} />
              <a href={item.itemUrl} target="_blank" className="img">bekijk grote afbeelding</a>
              {/* <div onClick={() => deleteFromFirebase(item.itemUrl)} className="btn">
               verwijder
              </div> */}
           </div>
         );
     })}
</div>
        </div>
    )
}
