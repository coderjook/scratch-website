import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
 
// een private wrapper om de Route zodat alleen ingelogde users het component kunnen  benaderen, 
// de rest wordt doorgestuurd naar de loginpagina

export default function PrivateRoute({ component: Component, ...rest}) {

    const {currentUser } = useContext(SnippetContext);

    return (

        <Route
            {...rest}
            render={props => {
               return currentUser ? <Component {...props} /> : <Navigate to="/"  />

            }}
        ></Route>
    )
}
