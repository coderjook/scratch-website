import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";






export default function GifList() {
// const initialInputState = {
//     itemUrl: '',
//     itemName:'',
// }

const [allItems, setAllItems] = useState([]);
const [categorie, setCategorie] = useState('');

useEffect(() => {
    // setAllItems([]);
  getFromFirebase();
  }, [categorie]) 

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
    console.log('categorie:', categorie)
    if (categorie) {
        let storageRef = storage.ref().child(categorie);
        //2.
        storageRef.listAll().then(function (res) {
            //3.
            res.items.forEach((imageRef) => {
            console.log('naam afbeelding:' ,imageRef.name)
            imageRef.getDownloadURL().then((url) => {
                //4.
                let currentItem = {
                    itemUrl: url, 
                    itemName: imageRef.name 
                }
                allItems.push(currentItem);
            });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  };


    return (
        <div>
            <div className="storagelist">

            <div onClick={() => setCategorie('snippets/')} className="btn">bekijk jpg scripts</div>
            <div onClick={() => setCategorie('gif/')} className="btn">bekijk animated gif</div>
     {allItems.map((item, index) => {
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
