import React, { useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { SnippetContext } from '../util/snippetContext';
import { ContextType} from '../components/snippets/Interfaces';
 
// een private wrapper om de Route zodat alleen ingelogde users het component kunnen  benaderen, 
// de rest wordt doorgestuurd naar de loginpagina

// interface PrivateRouteProps extends RouteProps{
//     // tslint:disable-next-line:no-any
//     component: any;
// }

// export default function PrivateRoute(props: PrivateRouteProps) {

//     const { component: Component,  ...rest } = props;

//     const {currentUser } = useContext(SnippetContext) as ContextType;

//     return (

//         <Route
//             {...rest}
//             render={ routeProps => {
//                return currentUser ? <Component {...routeProps} /> : <Navigate to="/"  />

//             }}
//         ></Route>
//     )
// }

// interface Props {
//   component: React.ComponentType
//   path?: string
  
// }

// export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {

//   const {currentUser } = useContext(SnippetContext) as ContextType;  
 

//   if (currentUser) {
//     return <RouteComponent />
//   }

//   return <Navigate to="/" />
// }