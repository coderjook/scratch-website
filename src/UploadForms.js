import React, {useState} from 'react';
import UploadTutorial from './components/tutorials/UploadTutorial';
import UploadSnippet from './components/snippets/UploadSnippet';
import StorageList from './components/storage/StorageList';

export default function UploadForms({allItemsSnippets, allItemsGif}) {
    const [toggleTutorial, setToggleTutorial] = useState(false);
    const [toggleSnippet, setToggleSnippet] = useState(false);

    return (
        <div className="container">
            <div className="toggle" onClick={() => setToggleTutorial(!toggleTutorial)}>Upload Tutorial</div>
            {toggleTutorial && <UploadTutorial />}
            <div className="toggle" onClick={() => setToggleSnippet(!toggleSnippet)}>Upload Snippet</div>
            {toggleSnippet && <UploadSnippet allItemsGif={allItemsGif} />}

      
            <StorageList allItemsSnippets={allItemsSnippets} allItemsGif={allItemsGif} />
        </div>
    )
}
