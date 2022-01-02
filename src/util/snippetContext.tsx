import React, { useState, createContext} from 'react';
import { ContextType,ISnippet, ISnippetControl, IItem} from '../components/snippets/Interfaces';


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
    const [snippetControl, setSnippetControl] = useState<ISnippetControl>({ storageName: '', openUpdate: false, openList: false});
    let allItemsGif : IItem[] = [];
    let allItemsSnippets : IItem[] = [];

    return (
        <SnippetContext.Provider value = {{
           currentSnippet,
           setCurrentSnippet,
           snippetControl,
           setSnippetControl,
           allItemsGif,
           allItemsSnippets


        }}>
            {children}
        </SnippetContext.Provider>
    );
};


  