import React, {useState, useContext} from 'react';
import UploadTutorial from './components/tutorials/UploadTutorial';
import UpdateSnippet from './components/snippets/UpdateSnippet';
import StorageList from './components/storage/StorageList'
import {ContextType, ISnippet, ISnippetControl} from './components/snippets/Interfaces';
import { SnippetContext } from './util/snippetContext';



export default function UploadForms() {
    const [toggleTutorial, setToggleTutorial] = useState(false);
    const {snippetControl, setSnippetControl, allItemsGif, allItemsSnippets } = useContext(SnippetContext) as ContextType;
    const [toggleUploadSnippet, setToggleUploadSnippet] = useState(false);

    const handleUploadSnippet = () => {
        setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, openUpdate:true}))
        //setSnippetControl({...snippetControl, openUpdate: true})
        setToggleUploadSnippet(!toggleUploadSnippet);

    }

    return (
        <div className="container">
            <div className="toggle" onClick={() => setToggleTutorial(!toggleTutorial)}>Upload Tutorial</div>
            {toggleTutorial && <UploadTutorial />}
            <div className="toggle" onClick={handleUploadSnippet}>Upload Snippet</div>
            {toggleUploadSnippet &&  <UpdateSnippet /> }

      
            <StorageList allItemsSnippets={allItemsSnippets} allItemsGif={allItemsGif} />
        </div>
    )
}
