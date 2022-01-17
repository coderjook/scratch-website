export type ContextType = {
  currentSnippet : ISnippet;
  setCurrentSnippet: any;
  // setCurrentSnippet: React.Dispatch<React.SetStateAction<ISnippet>>
  snippetControl: ISnippetControl;
  // setSnippetControl: any;
   setSnippetControl: React.Dispatch<React.SetStateAction<ISnippetControl>>
  allItemsGif: IItem[];
  allItemsSnippets: IItem[];
  getFromFirebaseStorage: any;
  currentUser: any;
            login: any;
            signup: any;
            logout: any;
            resetPassword: any;
            updateEmail: any;
            updatePassword: any;
}

export interface IItem {
      itemUrl: string
      itemName: string              
}

export interface ISnippet  {
    id: string
    objName: string
    titel: string 
    categorie: string
    leerdoelen: string 
    omschrijving: string 
    scratchUrl: string 
    pdfName: string
    pdfUrl: string
    gifName: string
    gifUrl: string
}

export interface ISnippetControl {
    storageName: string
    openUpdate: boolean
    openList: boolean
}

export interface IInputState {
  [propertyName: string]: string | number;
 
}