import React, { useState, createContext, useEffect} from 'react';
import { ContextType,ISnippet, ISnippetControl, IItem} from '../components/snippets/Interfaces';
import { storage } from "./firebase";
import { auth } from './firebase';


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
    const [currentUser,setCurrentUser] = useState<any>();
    const [loading,setLoading] = useState<boolean>(true);
    
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


    function signup(email:any, password:any) {
       return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email:any, password:any) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email:any) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email:any) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password:any) {
        return currentUser.updatePassword(password)
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    },[]) 

    return (
        <SnippetContext.Provider value = {{
           currentSnippet,
           setCurrentSnippet,
           snippetControl,
           setSnippetControl,
           allItemsGif,
           allItemsSnippets, 
           getFromFirebaseStorage,
            currentUser,
            login,
            signup,
            logout,
            resetPassword,
            updateEmail,
            updatePassword


        }}>
            {children}
        </SnippetContext.Provider>
    );
};


  