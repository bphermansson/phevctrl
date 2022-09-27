// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View, Button } from "native-base";
import { fontSize, padding } from "styled-system";
import { withTheme } from "styled-components";

export default function GetCarData() {
    const [lockData, setLockData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [chargeData, setChargeData] = useState([]);
    const [hvacData, setHvacData] = useState([]);
    const [hvacOperating, setHvacOperating] = useState([]);
    const [refreshButtonText, setRefreshButtonText]= useState(['Refresh']);

    var baseURL = "http://192.168.1.190:8000/?func=";
    

    const fetchLockData = async () => {
        const resp = await fetch(baseURL+"lockstatus");
        const lockStatus = await resp.json();
        console.log("Lock status: " + lockStatus.result)
        var lockSts = "Unlocked";
        if (lockStatus.result == 1)
        {
          lockSts = "Locked";
          console.log(lockSts);
        }
        else {
          lockSts = "Unlocked";
          console.log(lockSts);
        }
        setLockData(lockSts);
    };
    const fetchBatteryData = async () => {
      const resp = await fetch(baseURL+"battery");
      const batteryData = await resp.json();
      console.log("Battery data: " + batteryData.result)
      setBatteryData(batteryData);
    };
    const fetchHvacStatus = async () => {
      const resp = await fetch(baseURL+"hvacmode");
      const hvacData = await resp.json();
      var hvacStatus = "";
      console.log("Hvac data: " + hvacData.result)
      if (hvacData.result == 2)
      {
        hvacStatus = "Heat";
      }
      else {
        hvacStatus = "Cool";
      }
      console.log("hvacStatus-" + hvacStatus);
      setHvacData(hvacStatus);
      setNewRefreshButtonText("Refresh");
    };

    const fetchHvacOperating = async () => {
      const resp = await fetch(baseURL+"hvacoperating ");
      const hvacOperating = await resp.json();
      console.log("Hvac operating: " + hvacOperating.result)
      var hvacOnOff;
      if (hvacOperating.result == 0)
      {
        hvacOnOff = "Off";
      }
      else 
      {
        hvacOnOff = "On";
      }
      setHvacOperating(hvacOnOff)
    };

    function setNewRefreshButtonText(text) {
      console.log(text);
      setRefreshButtonText(text);
  }
  
    const fetchChargeStatus = async () => {
      //http://192.168.1.79:8000/?func=chargestatus
      const resp = await fetch(baseURL+"chargestatus");
      const chargeData = await resp.json();
      console.log("Charge status: " + chargeData.result)
      setChargeData(chargeData);
    };

    const onHeatButton = async () => {
    };

    const onRefreshButton = async () => {
      setNewRefreshButtonText("Wait...");
      console.log("Refresh values");
      setBatteryData(0);
      setChargeData(0);
      setHvacData("-");
      fetchLockData();
      fetchBatteryData();
      fetchHvacStatus();
      fetchChargeStatus();
    };

    useEffect(() => {
        fetchLockData();
        fetchBatteryData();
        fetchHvacStatus();
        fetchHvacOperating();
        fetchChargeStatus();
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
            Lock status: {lockData}
        </Text>  
        <Text style={styles.baseText}>
            Battery:{batteryData.result}
        </Text>  
        <Text style={styles.baseText}>
            Chargestatus:{chargeData.result}
        </Text>  
        <Text style={styles.baseText}>
            AC mode:{hvacData}
        </Text>  
        <Text style={styles.baseText}>
            AC status:{hvacOperating}
        </Text>  
      </View>

      <TouchableNativeFeedback
          onPress={onHeatButton} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Heat car</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={onRefreshButton} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{refreshButtonText}</Text>
          </View>
        </TouchableNativeFeedback>

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
    padding: 10,
    fontSize: 18
  },
  innerText: {
    color: 'red'
  },
  button: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    flex:1
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 18
  }
});