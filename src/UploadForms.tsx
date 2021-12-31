import React, {useState} from 'react';
import UploadTutorial from './components/tutorials/UploadTutorial';
import UpdateSnippet from './components/snippets/UpdateSnippet';
import StorageList from './components/storage/StorageList';
import {ISnippet, ISnippetControl} from './components/snippets/Interfaces'
import { allItemsGif, allItemsSnippets} from './util/getFromFirebase';

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

export default function UploadForms() {
    const [toggleTutorial, setToggleTutorial] = useState(false);
    const [currentSnippet,setCurrentSnippet] = useState<ISnippet>(initialInputState);
    const [snippetControl, setSnippetControl] = useState<ISnippetControl>({ storageName: '', openUpdate: false, openList: false});
    const [toggleUploadSnippet, setToggleUploadSnippet] = useState(false);

    const handleUploadSnippet = () => {
        setSnippetControl({...snippetControl, openUpdate: true})
        setToggleUploadSnippet(!toggleUploadSnippet);

    }

    return (
        <div className="container">
            <div className="toggle" onClick={() => setToggleTutorial(!toggleTutorial)}>Upload Tutorial</div>
            {toggleTutorial && <UploadTutorial />}
            <div className="toggle" onClick={handleUploadSnippet}>Upload Snippet</div>
            {toggleUploadSnippet &&  <UpdateSnippet currentSnippet={currentSnippet} setCurrentSnippet={setCurrentSnippet} snippetControl={snippetControl} setSnippetControl={setSnippetControl}/> }

      
            <StorageList allItemsSnippets={allItemsSnippets} allItemsGif={allItemsGif} />
        </div>
    )
}
