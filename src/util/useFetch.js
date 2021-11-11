import React, {useState, useEffect} from 'react';
import axios from 'axios';
import cors from 'cors';


export const useFetch = (urldata, initialValue) => {
    const [data, setData] = useState(initialValue);
    const [url, setUrl] = useState(urldata);
    const [ isLoading, setIsloading] = useState(false);
    const [ isError, setIsError] = useState(false);

  
    useEffect(() => {
        const fetchData = async () =>{
            setIsError(false);
            setIsloading(true);
            
            try {
                const result = await axios(url);
                setData(result.data);
            } catch (error) {
                setIsError(true);
                console.log(isError)
            }

            setIsloading(false);
        }
        fetchData()
    }, [url])

    return data;
}