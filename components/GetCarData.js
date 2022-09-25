// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View, Button } from "native-base";
import { padding } from "styled-system";
import { withTheme } from "styled-components";

export default function GetCarData() {
    const [lockData, setLockData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [chargeData, setChargeData] = useState([]);

    var baseURL = "http://192.168.1.190:8000/?func=";

    const fetchLockData = async () => {
        const resp = await fetch(baseURL+"lockstatus");
        const lockStatus = await resp.json();
        console.log("Lock status: " + lockStatus.result)
        setLockData(lockStatus);
    };
    const fetchBatteryData = async () => {
      const resp = await fetch(baseURL+"battery");
      const batteryData = await resp.json();
      console.log("Battery data: " + batteryData.result)
      setBatteryData(batteryData);
    };
    const onCheckChargeButton = async () => {
      //http://192.168.1.79:8000/?func=chargestatus
      const resp = await fetch(baseURL+"chargestatus");
      const chargeData = await resp.json();
      console.log("Charge status: " + chargeData.result)
      setChargeData(chargeData);
    };

    useEffect(() => {
        fetchLockData();
        fetchBatteryData();
      }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: "black", height: 20 }} >
          <Text style={styles.header}>
            phevctrl
          </Text>
      </View>
      <View style={{ flex: 2, backgroundColor: "white"}} >
        <Text style={styles.baseText}>
            {lockData.cmd}:{lockData.result}
        </Text>  
        <Text style={styles.baseText}>
            {batteryData.cmd}:{batteryData.result}
        </Text>  
        <Text style={styles.baseText}>
            Chargestatus:{chargeData.result}
        </Text>  
      </View>
      <TouchableWithoutFeedback
            onPress={onCheckChargeButton}           
            >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Check charge status</Text>
          </View>
        </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    padding: 10
  },
  innerText: {
    color: 'red'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
});