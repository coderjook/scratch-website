import React, {useState, useContext} from 'react';
import UploadTutorial from './components/tutorials/UploadTutorial';
import UpdateSnippet from './components/snippets/UpdateSnippet';
import StorageList from './components/storage/StorageList'
import {ContextType,ISnippetControl} from './components/snippets/Interfaces';
import { SnippetContext } from './util/snippetContext';
import { useNavigate } from 'react-router-dom';



export default function UploadForms() {
    const [toggleTutorial, setToggleTutorial] = useState(false);
    const {setSnippetControl, allItemsGif, allItemsSnippets, currentUser, logout  } = useContext(SnippetContext) as ContextType;
    const [toggleUploadSnippet, setToggleUploadSnippet] = useState(false);
    const [error, setError] = useState("");

    const handleUploadSnippet = () => {
        setSnippetControl((prevState: ISnippetControl)=> ({ ...prevState, openUpdate:true}))
        //setSnippetControl({...snippetControl, openUpdate: true})
        setToggleUploadSnippet(!toggleUploadSnippet);

    }

    const navigate = useNavigate();

    async function handleLogout() {
        setError('')

        try {
            await logout();
            navigate('/login');
            
        } catch  {
            setError('Failed to log out')
        }

    }

    return (
        <div className="container">
            user: {currentUser ? currentUser.email : "niet ingelogd"}
            <div className="toggle" onClick={() => setToggleTutorial(!toggleTutorial)}>Upload Tutorial</div>
            {currentUser && toggleTutorial && <UploadTutorial />}
            <div className="toggle" onClick={handleUploadSnippet}>Upload Snippet</div>
            {currentUser && toggleUploadSnippet &&  <UpdateSnippet /> }

      
            <StorageList allItemsSnippets={allItemsSnippets} allItemsGif={allItemsGif} />
            
            <div onClick={handleLogout} className="toggle">Uitloggen</div>
           
        </div>
    )
}
