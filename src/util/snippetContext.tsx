import React, { useState, createContext} from 'react';
import { ContextType,ISnippet, ISnippetControl, IItem} from '../components/snippets/Interfaces';
import { storage } from "./firebase";


export const initialInputStateCurrentSnippet = {   
    id: "0" ,
    objName: '',
    titel: '' ,
    categorie: '',
    leerdoelen: '' ,
    omschrijving: '', 
    scratchUrl: '' ,
    pdfName: '',
    pdfUrl: '',
    gifName: '',
    gifUrl: ''
 }

export const SnippetContext = createContext<ContextType | null>(null);

export const SnippetContextProvider : React.FC<React.ReactNode> = ({children}) : any => {

    const [currentSnippet,setCurrentSnippet] = useState<ISnippet>(initialInputStateCurrentSnippet);
    const [snippetControl, setSnippetControl] = useState<ISnippetControl>({ storageName: '', openUpdate: false, openList: false});
    const [allItemsGif, setAllItemsGif] = useState<IItem[]>([]);
    const [allItemsSnippets, setAllItemsSnippets] = useState<IItem[]>([]);
    
    const getFromFirebaseStorage = (endpoint: 'gif/' | 'snippet/') => {
   
        let storageRef = storage.ref().child(endpoint);
        storageRef.listAll().then(function (res) {
            res.items.forEach((imageRef) => {

            imageRef.getDownloadURL().then((url) => {
             let currentItem = {
                    itemUrl: url,
                    itemName: imageRef.name
                }
                if (endpoint === 'gif/') {               
                    setAllItemsGif((prevState)=> [...prevState, currentItem])
                } else {
                   setAllItemsSnippets((prevState)=> [...prevState, currentItem])
                }
            });
          });  
        })
        .catch(function (error) {
            console.log(error);
        });   
};


    return (
        <SnippetContext.Provider value = {{
           currentSnippet,
           setCurrentSnippet,
           snippetControl,
           setSnippetControl,
           allItemsGif,
           allItemsSnippets, 
           getFromFirebaseStorage


        }}>
            {children}
        </SnippetContext.Provider>
    );
};


  