import React, { useState, createContext} from 'react';
import {  ISnippetControl} from '../components/snippets/Interfaces';


const initialInputState = {   
    id: 0 ,
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

    const [currentSnippet,setCurrentSnippet] = useState<ISnippet>(initialInputState);

    return (
        <SnippetContext.Provider value = {{
           currentSnippet,
           setCurrentSnippet 
        }}>
            {children}
        </SnippetContext.Provider>
    );
};


  