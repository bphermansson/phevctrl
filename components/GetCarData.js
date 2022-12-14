// https://blog.logrocket.com/data-fetching-react-native/
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableNativeFeedback, Alert, StatusBar} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { SelectList } from 'react-native-dropdown-select-list'

export default function GetCarData() {
    const [lockData, setLockData] = useState([]);
    const [batteryData, setBatteryData] = useState([]);
    const [chargeData, setChargeData] = useState([]);
    const [remainingChargeData, setRemainingChargeData] = useState([]);
    const [hvacData, setHvacMode] = useState([]);
    const [hvacOperating, setHvacOperating] = useState([]);
    const [refreshButtonText, setRefreshButtonText]= useState(['Refresh']);
    const [refreshButtonStyle, setRefreshButtonDisEn]= useState(['styles.button']);

    // SelectList for AC Times
    const [timeSelected, setSelected] = React.useState("");
    const data = [
        {key:'1', value:'10min'},
        {key:'2', value:'20min'},
        {key:'3', value:'30min'},
    ]

    var baseURL = "http://192.168.1.190:8000/?func=";
    var hvacStatus = "";
    var acmode = "heat";
    var actime = "20 min";

    const fetchLockData = async () => {
      console.log("fetchLockData: "  + fetchLockData);
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

    // TODO
    /*
    remaningchargestatus
          const resp = await fetch(baseURL+"remaningchargestatus");


    */
    const remaningchargestatus = async () => {
      const resp = await fetch(baseURL+"remaningchargestatus");
      const hvacMode = await resp.json();
      console.log("Hvac mode: " + hvacMode.result)
    }

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
      acmode = modeData
      setChosenOptionMode(modeData)
    }

    const acTimeChange = (timeData, e) => {
      console.log("---" + timeData)
      actime = timeData
      setChosenOptionTime(timeData)
    }

    async function onSetACButton(acOnOff) 
    {
        console.log("onSetACButton:" + acOnOff);
        //func=aircon&state=on
        const url = baseURL+"aircon&state=" + acOnOff
        console.log("URL: " + url)
        const resp = await fetch(url);
        if (resp.result == 0) 
        {

        }
        console.log("Command completed ")
    };
  
    async function onAcModeSelect(acMode) 
    {
      //alert("I'm doing nothing!");
      if(timeSelected=="2"){
        console.log("No time given");  
      }
      console.log("AC mode: " + acMode + " " + timeSelected)
      var intAcTime = timeSelected.match(/\d+/)[0] // Get the integer
      console.log("actime: "+ intAcTime)
      // func=acmode&mode=cool&time=10
      const url = baseURL+"acmode&mode=" + acMode + "&time=" + intAcTime
      console.log("URL: " + url)
     // const resp = await fetch(url);
     /*console.log("Result: " + resp.result)
      if (resp.result == 0) 
      {

      }*/
      fetchHvacStatus()
      console.log("Command completed ")
    };

    
    function setNewRefreshButtonText(text) 
    {
      console.log(text);
      setRefreshButtonText(text);
    }

    function setRefreshButtonDisEnStatus(truefalse)
    {
      if(truefalse)
      {
        console.log("Disable button")
        setRefreshButtonDisEn(styles.buttonDisabled)
      }
      else 
      {
        setRefreshButtonDisEn(styles.button)
      }      
    }

    const onSetACModeButton = async () => {
      var acModeResText, acOnResText;
      console.log("onSetACModeButton" + actime + "-" + acmode);
      var thenum = actime.match(/\d+/)[0] // Get the integer
      console.log("actime: "+thenum)
      //func=acmode&mode=heat&time=10
      // var baseURL = "http://192.168.1.190:8000/?func=";
      var setAcUrl = baseURL + "acmode&mode=" + acmode + "&time=" + thenum
      console.log("Set ac Url:" + setAcUrl)

      // Set AC mode and time
      const nrtime = actime.split(' ');    // remove 'min'
      const tempurl = baseURL+"acmode&mode=" + acmode + "&time=" + nrtime[0]
      console.log(tempurl)
      const resp = await fetch(tempurl);
      const setAcModeStatus = await resp.json();
      console.log("Set AC mode result: " + setAcModeStatus.result)

      // Activate AC (also needed when heating)
      tempurl = baseURL+"aircon on"
      console.log(tempurl)
      resp = await fetch(tempurl);
      const setAcOnStatus = await resp.json();
      console.log("Set AC on result: " + setAcOnStatus.result)
      
      if (setAcModeStatus.result == 0) 
      {

      }
      

    };

    const onRefreshButton = async () => {
      setNewRefreshButtonText("Wait...");
      setRefreshButtonDisEnStatus(true);
      console.log("Refresh values, wait...");
      setBatteryData(0);
      setChargeData(0);
      setHvacMode(0);
      fetchLockData();
      fetchBatteryData();
      fetchChargeStatus();
      fetchHvacStatus();  // Let this be last as it resets the Refresh button text
      setRefreshButtonDisEnStatus(false);
    };

    const resetServerWifi = async () => {
      console.log("Reset server Wifi");
      const resp = await fetch(baseURL+"resetwifi ");
      //const hvacOperating = await resp.json();
      console.log("Done resetting Wifi")
    }

    try{
      useEffect(() => {
          console.log("Fetch data");
          resetServerWifi();  // When the car has been away, the Wifi has to reconnect. This is done by the server. 
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
      
      const [chosenOptionMode, setChosenOptionMode] = useState(acmode); //will store our current user options
      const [chosenOptionTime, setChosenOptionTime] = useState(actime); 
      
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
      <View style={{ backgroundColor: "#7cb48f", flex: 1, padding: 1 }} >
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
          styles={styles.logo}
        />
      </View>
{/* Info panel */}
      <View style={{ backgroundColor: "#7cb48f", flex: 2, padding: 1 }} >
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
          Remaining charge {remainingChargeData}
        </Text>  
        <Text style={styles.baseText}>
          AC mode: {hvacData}
        </Text>  
        <Text style={styles.baseText}>
          AC on/off: {hvacOperating}
        </Text>
      </View>    
{/* Buttons */}
      <View style={styles.rowcontainer}>
        <View style={styles.smallSquare} >
          <TouchableNativeFeedback
              onPress={ () => onSetACButton("on")}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>AC on</Text>
              </View>
            </TouchableNativeFeedback>
        </View>    
        <View style={styles.smallSquare} >
          <TouchableNativeFeedback
              onPress={ () => onSetACButton("off")}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>AC off</Text>
              </View>
            </TouchableNativeFeedback>
        </View>   
      </View> 
      <View style={styles.rowcontainer}>
        <View style={styles.smallSquare} >
          <TouchableNativeFeedback
              onPress={ () => onAcModeSelect("cool")}>
              <View style={styles.buttonLblue}>
                <Text style={styles.buttonText}>Cool</Text>
              </View>
            </TouchableNativeFeedback>
        </View>    
        <View style={styles.smallSquare} >
          <TouchableNativeFeedback
            onPress={ () => onAcModeSelect("heat")}>
                <View style={styles.buttonLblue}>
                <Text style={styles.buttonText}>Heat</Text>
              </View>
            </TouchableNativeFeedback>
        </View>    
        <View style={styles.smallSquare} >
          <TouchableNativeFeedback
              onPress={ () => onAcModeSelect("windscreen")}>
              <View style={styles.buttonLblue}>
                <Text style={styles.buttonText}>Windscreen</Text>
              </View>
            </TouchableNativeFeedback>
        </View>    
      </View> 
      <View style={styles.lowrowcontainer}>
        <Text style={{ fontSize: 18, padding: 5 }} >AC run time:</Text>
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={data} 
          search={false} 
          defaultOption={{ key:'20min', value:'20min' }}
          save="value"
        />
        <View style={styles.rectangle} >
          <TouchableNativeFeedback
            onPress={onRefreshButton} 
              >
            <View style={styles.button}>
              <Text style={refreshButtonStyle}>{refreshButtonText}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

{/* Selections */}
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
        <View style={styles.square} >
          <TouchableNativeFeedback
            onPress={onSetACModeButton} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Set</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  rowcontainer: {
    backgroundColor: "#7CA1B4",
    flex: 0,
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row",
    maxHeight: 210,
    padding: 5,
  },
  lowrowcontainer: {
    backgroundColor: "#7CA1B4",
    flex: 0,
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
  logo: {
      height: 300,
      flex: 1,
      width: null
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    flex:1,
  },
  buttonLblue: {
    alignItems: 'center',
    backgroundColor: '#397eed',
    justifyContent: 'center',
    flex:1,
  },
  buttonDisabled: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
    opacity: .6,
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
    padding: 10,
  },
  rectangle: {
    backgroundColor: "#7cb48f",
    width: 130,
    height: 70,
    margin: 0,
    padding: 4,
  },
  smallSquare: {
    backgroundColor: "#7cb48f",
    width: 120,
    height: 60,
    margin: 1,
  },
});