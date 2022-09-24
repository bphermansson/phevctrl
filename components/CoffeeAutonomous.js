// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View } from "native-base";
import { padding } from "styled-system";

export default function CoffeeAutonomous() {
    const [data, setData] = useState([]);
    const [moredata, setMoreData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        var baseURL = "http://192.168.1.190:8000/?func=";


        const resp = await fetch(baseURL+"lockstatus");
        const data = await resp.json();
        console.log("Data: " + data.result)
        setData(data);
        setLoading(false);
    };

    const fetchMoreData = async () => {
      var baseURL = "http://192.168.1.190:8000/?func=";
      const resp = await fetch(baseURL+"battery");
      const moredata = await resp.json();
      console.log("More data: " + moredata.result)
      setMoreData(moredata);
      setLoading(false);
  };

    useEffect(() => {
        fetchData();
        fetchMoreData();
      }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: "red", height: 20 }} />
      <View style={{ flex: 2, backgroundColor: "white"}} >
        <Text style={styles.baseText}>
            {data.cmd}:{data.result}
        </Text>  
        <Text style={styles.baseText}>
            {moredata.cmd}:{moredata.result}
        </Text>  

      </View>
    


    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    padding: 10
  },
  innerText: {
    color: 'red'
  }
});