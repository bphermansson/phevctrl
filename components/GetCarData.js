// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View, Image } from "native-base";
import { fontSize, padding } from "styled-system";

export default function GetCarData() {
    const [lockData, setLockData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [chargeData, setChargeData] = useState([]);
    const [hvacData, setHvacMode] = useState([]);
    const [hvacOperating, setHvacOperating] = useState([]);
    const [refreshButtonText, setRefreshButtonText]= useState(['Refresh']);

    var baseURL = "http://192.168.1.190:8000/?func=";
    var hvacStatus = "";

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
        else 
        {
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

    const fetchChargeStatus = async () => {
      const resp = await fetch(baseURL+"chargestatus");
      const chargeData = await resp.json();
      console.log("Charge status: " + chargeData.result)
      var chargingYesNo;
      if (chargeData.result == 0)
      {
        chargingYesNo = "No";
      }
      else
      {
        chargingYesNo = "Yes";
      }
      setChargeData(chargingYesNo);
    };

    const fetchHvacStatus = async () => {
      const resp = await fetch(baseURL+"hvacmode");
      const hvacMode = await resp.json();
      console.log("Hvac mode: " + hvacMode.result)
      if (hvacMode.result == 2)
      {
        hvacStatus = "Heat";
      }
      else {
        hvacStatus = "Cool";
      }
      console.log("hvacStatus-" + hvacStatus);
      setHvacMode(hvacStatus);
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

    const onAcModeSelect = async (e) => {
      const dta = e.json();
      alert(dta + "I'm doing nothing!");
      //console.log("AC mode: " + hvacStatus)
      // Get AC mode
    };

    const acModeChange = (data, e) => {
      console.log("---" + data.label)

    }

    function setNewRefreshButtonText(text) {
      console.log(text);
      setRefreshButtonText(text);
    }
    const onRefreshButton = async () => {
      setNewRefreshButtonText("Wait...");
      console.log("Refresh values, wait...");
      setBatteryData(0);
      setChargeData(0);
      setHvacMode(0);
      fetchLockData();
      fetchBatteryData();
      fetchChargeStatus();
      fetchHvacStatus();  // Let this be last as it resets the Refresh button text
    };

    useEffect(() => {
      console.log("Fetch data");
      setChargeData("");
        fetchLockData();
        fetchBatteryData();
        fetchHvacStatus();
        fetchHvacOperating();
        fetchChargeStatus();
        console.log("Done fetching data");
      }, []);

      //       /* TODO Add a live clock*/


      const acModeData = [
        {
          label: 'AC mode cool'
         },
         {
          label: 'AC mode heat'
         },
         {
          label: 'AC mode windscreen'
         }
        ];

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: "black", height: 20 }} >
          <Text style={styles.header}>
            phevctrl
          </Text>
          <Image 
            source={require('../assets/outlanderFront.jpg')} 
            alt="Logo image"
          />
      </View>
      <View style={{ flex: 2, backgroundColor: "white"}} >
        <Text style={styles.baseText}>
            Lock status: {lockData}
        </Text>  
        <Text style={styles.baseText}>
            Battery: {batteryData.result}
        </Text>  
        <Text style={styles.baseText}>
            Charging? {chargeData}
        </Text>  
        <Text style={styles.baseText}>
            AC mode: {hvacData}
        </Text>  
        <Text style={styles.baseText}>
          AC on/off: {hvacOperating}
          </Text>
        <RadioButtonRN
          // This can be styled if we wish, see docs
          data={acModeData}
          selectedBtn={(e) => acModeChange(e)}
        />

      {/*
      <TouchableNativeFeedback
          onPress={onHeatButton} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Heat car</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={onSetACModeButton} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>AC Mode</Text>
          </View>
        </TouchableNativeFeedback>
      */}
        <TouchableNativeFeedback
          onPress={onRefreshButton} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{refreshButtonText}</Text>
          </View>
        </TouchableNativeFeedback>
        </View>
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