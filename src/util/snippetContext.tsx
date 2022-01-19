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
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
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
        setLoggedIn(true);
       return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email:any, password:any) {
        setLoggedIn(true);
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        setLoggedIn(false);
        return auth.signOut();
        
    }

    function resetPassword(email:any) {
        return auth.sendPasswordResetEmail(email)
    }

 

 // auth.onAuthStateChange method firebase notify you if user get set

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
             if (user) {
                setCurrentUser(user);
                setLoading(false);
            } else {
                setCurrentUser('noUser');
                setLoading(false);
                // User is signed out
                // ...
             }
        
        })

        return unsubscribe;
    },[]) 

    //   useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged( user => {
    //         setCurrentUser(user);
    //         setLoading(false);
    //     })

    //     return unsubscribe;
    // },[]) 

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
            setCurrentUser,
            login,
            signup,
            logout,
            resetPassword,
            loggedIn,
            setLoggedIn


        }}>
            {children}
        </SnippetContext.Provider>
    );
};


  