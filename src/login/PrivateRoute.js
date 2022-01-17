import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../util/AuthContext';
 
// een private wrapper om de Route zodat alleen ingelogde users het component kunnen  benaderen, 
// de rest wordt doorgestuurd naar de loginpagina

export default function PrivateRoute({ component: Component, ...rest}) {

    const {currentUser } = useAuth();

    return (

        <Route
            {...rest}
            render={props => {
               return currentUser ? <Component {...props} /> : <Navigate to="/login"  />

            }}
        ></Route>
    )
}
