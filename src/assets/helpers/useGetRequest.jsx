import {useState,useEffect} from 'react'
require('dotenv').config();



export default function useGetRequest(route,params) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const paramsList = addSymbolBeforeParam();
  const url =`https://api.themoviedb.org/3${route}?api_key=${apiKey}${paramsList}`;

  const [data, setData] = useState(null);
  
  function addSymbolBeforeParam() {
    let str = '';
    if(params){
      params.forEach(element => {
        str=str+`&${element}`;
      });
    }
    return str;
  }

useEffect(()=>{

  (async function(){

  const response= await fetch(url);

  if(response["ok"]){
    
    const responseJson= await response.json();
    
    setData(responseJson["results"])
  }



})();

},[url])

  return data;
}
