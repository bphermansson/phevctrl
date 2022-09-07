import React, { useState, useEffect } from 'react';

const getdata = async (complUrl) => {
    console.log(complUrl)
    try {
      let response = await fetch(
        complUrl
      );
    {/*
      let json = await response.json();
      return json.movies;
    
    */}
    let json = await response.json();
    return json;
    console.log(json)
    } catch (error) {
        console.log("Error")

    }
  };

class netCall {
    nc(what) {
      alert(what);
      const complUrl = 'http://192.168.1.190:8000/?func=' + what
      getdata(complUrl)
    }
  }
  

  {/*const test = new getArticlesFromApi();*/}
  const netc = new netCall();
  export default netc;
{/*
  export default netc;
*/}
  const getCarData = (what) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data);
    console.log("Get data " + what);
    const complUrl = 'http://192.168.1.190:8000/?func=' + what
    console.log("Get data " + complUrl);
  
    useEffect(() => {
      fetch('http://192.168.1.190:8000/?func=lockstatus')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      console.log("ok")
    );
  }
  
  