// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View } from "native-base";
import { padding } from "styled-system";

export default function GetCarData() {
    const [lockData, setLockData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLockData = async () => {
        var baseURL = "http://192.168.1.190:8000/?func=";
        const resp = await fetch(baseURL+"lockstatus");
        const lockStatus = await resp.json();
        console.log("Lock status: " + lockStatus.result)
        setLockData(lockStatus);
        setLoading(false);
    };

    const fetchBatteryData = async () => {
      var baseURL = "http://192.168.1.190:8000/?func=";
      const resp = await fetch(baseURL+"battery");
      const batteryData = await resp.json();
      console.log("Battery data: " + batteryData.result)
      setBatteryData(batteryData);
      setLoading(false);
  };

    useEffect(() => {
        fetchLockData();
        fetchBatteryData();
      }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: "red", height: 20 }} />
      <View style={{ flex: 2, backgroundColor: "white"}} >
        <Text style={styles.baseText}>
            {lockData.cmd}:{lockData.result}
        </Text>  
        <Text style={styles.baseText}>
            {batteryData.cmd}:{batteryData.result}
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