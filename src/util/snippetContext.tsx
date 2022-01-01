import React, { createContext} from 'react';

type SnippetContextProviderProps = {
    children : React.ReactNode
    snippet : any
}

const SnippetContext = createContext({});

export const SnippetContextProvider = (children : SnippetContextProviderProps ) => {

return (
    <SnippetContext.Provider value={SnippetContext}>{children}</SnippetContext.Provider>
  );
};
