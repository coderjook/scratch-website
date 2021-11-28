import React, { useState, useEffect} from 'react';
import { storage } from "../../util/firebase";


export default function StorageList() {


const [allItems, setAllItems] = useState([]);
const [categorie, setCategorie] = useState('');

useEffect(() => {console.log('all items state', allItems[0])}, [allItems])
    useEffect(() => {console.log('all items state', allItems)}, [allItems])


    useEffect(() => {
  // setAllItems([]);
  getFromFirebase();
  }, [categorie])

    let currentItems = [];
console.log(currentItems, 'current items')

    const getFromFirebase = () => {
    //1.
    console.log('categorie:', categorie)
    if (categorie) {
        let storageRef = storage.ref().child(categorie);

        //2.
        storageRef.listAll().then(function (res) {
            //3.
            console.log(res.items, 'res items')
                res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
                //4.
                let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
                // return currentItem;
                // console.log(currentItem, 'currentitem')
                currentItems.push(currentItem);
                // console.log('currentItems:' ,currentItems)
            });
            });
            // console.log(newItems, 'new items')

        })
        .catch(function (error) {
            console.log(error);
        });
    }
  };
  //
  //  const consoleLog = () => {
  //       console.log ('consolelog allItems', allItems)
  // }

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

    const proofOfConcept = () => {
        setAllItems(currentItems)
    }

    return (
        <div>
            <div className="storagelist">

            <div onClick={() => setCategorie('snippets/')} className="btn">bekijk jpg scripts</div>
            <div onClick={() => setCategorie('gif/')} className="btn">bekijk animated gif</div>
            <div className="btn">console log</div>
                {/*{allItems.map((item) => <p>test</p>)}*/}
                <button onClick={proofOfConcept}>proof of concept</button>
     {allItems.map((item, index) => {
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
