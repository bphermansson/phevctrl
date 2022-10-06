// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback, Alert, StatusBar} from 'react-native';
import { Box, FlatList, Center, NativeBaseProvider, Text, View, Image } from "native-base";
import { fontSize, padding, textColor } from "styled-system";
import RadioForm from 'react-native-simple-radio-button';

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
    console.log(fetchLockData);
    var lockStatus="";
    setLockData(lockSts);
    // If we dont get a response in 30 seconds, something is wrong with the server. 
    setTimeout(() => {
      if (typeof(lockStatus) !== 'undefined' && lockStatus != null) {
        console.log('Data retrieved as expected') // False indication!
      } else {
        console.log('No lockstatus retrieved after 30 seconds')
        Alert.alert('Network error, no data retrieved!');
      }
    }, 30000);

    try 
    {
      const resp = await fetch(baseURL+"lockstatus");
      lockStatus = await resp.json();
      console.log("Lock status: " + lockStatus.result)
      var lockSts = "Unlocked";
      if (lockStatus.result == 1)
      {
        lockSts = "Locked";
      }
      else 
      {
        lockSts = "Unlocked";
      }
      console.log(lockSts);
      setLockData(lockSts);

    }
    catch(e) 
    {
      console.log("Error: " + e);
      exit();
    }
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

    const acModeChange = (modeData, e) => {
      //func=acmode&mode=cool&time=10
      console.log("---" + modeData)

      if (modeData == 'heat')
      {
        console.log("Set heat")
      }
      else if (modeData == 'cool')
      {
        console.log("Set cool")
      }
      else if (modeData == 'windscreen')
      {
        console.log("Set windscreen")
      }
      else
      {
        console.log("Error")
      }
      setChosenOptionMode(modeData)
    }

    const acTimeChange = (timeData, e) => {
      console.log("---" + timeData)
      setChosenOptionTime(timeData)
    }

    function setNewRefreshButtonText(text) 
    {
      console.log(text);
      setRefreshButtonText(text);
    }

    function onHeatButton() 
    {
      console.log(onHeatButton);
      //func=acmode&mode=heat&time=10


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

    try{
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
    }
    catch(e) 
    {
      console.log("Data fetch error: " + e);
    }
      //       /* TODO Add a live clock*/


      const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
      )
      const Col = ({ numRows, children }) => {
        return  (
          <View style={styles[`${numRows}col`]}>{children}</View>
        )
      }
      
      const [chosenOptionMode, setChosenOptionMode] = useState('cool'); //will store our current user options
      const [chosenOptionTime, setChosenOptionTime] = useState('10 min'); 
      
      const options_mode = [
        { label: 'AC mode cool', value: 'cool' },
        { label: 'AC mode heat', value: 'heat' },
        { label: 'AC mode windscreen', value: 'windscreen' },
      ]; //create our options for radio group
      const options_time = [
        { label: '10 min', value: '10 min' },
        { label: '20 min', value: '20 min' },
        { label: '30 min', value: '30 min' },
      ]; //create our options for radio group

  return (
    <NativeBaseProvider>
      <View style={{ backgroundColor: "#7cb48f", flex: 1 }} >
        <StatusBar
          backgroundColor="#264d9b"
          barStyle="light-content"
        />
        <Text style={styles.header}>
          phevctrl
        </Text>
        <Image 
          source={require('../assets/outlanderFront.jpg')} 
          alt="Logo image"
        />
      </View>
      <View style={{ backgroundColor: "#7cb48f", flex: 2 }} >
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
      </View>    
 
      <View style={styles.rowcontainer}>
        <View style={styles.square} >
          <Text> {chosenOptionMode}</Text>
          <RadioForm
            radio_props={options_mode}
            buttonSize={8}
            initial={0} //initial value of this group
            onPress={(value) => {
              acModeChange(value)
            }} //if the user changes options, set the new value
          />
        </View>
        <View style={styles.square} >
          <Text> {chosenOptionTime}</Text>
            <RadioForm
              radio_props={options_time}
              buttonSize={8}
              initial={0} //initial value of this group
              onPress={(timeValue) => {
                acTimeChange(timeValue)
              }} 
            />
          </View>
        <View style={styles.square} />
      </View>

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  rowcontainer: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
  },
  colcontainer: {
    backgroundColor: "#7CA1AA",
    flex: 1,
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
  },
  header: {
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
    textColor: 'black'
  },
  innerText: {
    color: 'red'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    flex:1,
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 18
  },
  row: {
    flexDirection: "row"
  },
  "1col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  1
  },
  "2col":  {
    backgroundColor:  "green",
    fontSize: 18,
    padding: 20,
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  2
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 130,
    height: 150,
    margin: 4,
  },

});