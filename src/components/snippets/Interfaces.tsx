export interface ISnippet  {
    id: number
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
  [propertyName: string]: string;
}