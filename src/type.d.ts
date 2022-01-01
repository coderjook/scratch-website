type ContextType = {
    currentSnippet : ISnippet;
    setCurrentSnippet: any;
}

interface ISnippet  {
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