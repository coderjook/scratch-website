import { storage } from "./firebase";
 
export interface IItem {
      itemUrl: string
      itemName: string              
}

export let allItemsGif : IItem[] = [];
export let allItemsSnippets : IItem[] = [];

export const getFromFirebaseGif = () => {
   
        let storageRef = storage.ref().child('gif/');
        storageRef.listAll().then(function (res) {
            res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
               allItemsGif.push(currentItem);
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });   
};


export const getFromFirebaseSnippets = () => {
   
    
        let storageRef = storage.ref().child('snippets/');
        storageRef.listAll().then(function (res) {
           res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
               allItemsSnippets.push(currentItem);
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });
   
};