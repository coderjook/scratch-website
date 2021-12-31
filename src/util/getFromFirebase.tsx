import { storage } from "./firebase";
 
export interface IItem {
      itemUrl: string
      itemName: string              
}

export let allItemsGif : IItem[] = [];
export let allItemsSnippets : IItem[] = [];

export const getFromFirebase = (endpoint: 'gif/' | 'snippets/') => {
   
        let storageRef = storage.ref().child(endpoint);
        storageRef.listAll().then(function (res) {
            res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
                if (endpoint === 'gif/') {
               allItemsGif.push(currentItem);
                } else {
                  allItemsSnippets.push(currentItem);
                }
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });   
};


