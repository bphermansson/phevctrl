import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import CoffeeAutonomous from "./components/CoffeeAutonomous";
import axios from 'axios';

  var baseURL = "http://192.168.1.190:8000/?func=";

  /*

  class netCall {

    render () {
      console.log("nc")

      return (
            <Text>Hello World!</Text>
        )
    }
  }


  function App() {

    let [battStatus, setDogImage] = useState(null)
    let [lockStatus, setLockStatus] = useState(null)
    const [data, setData] = useState({ hits: [] });

    useEffect(() => {
      var url = baseURL + "lockstatus"
      const fetchData = async () => {
        const result = await axios(
          url,
        );
        console.log(result.data)
        setData(result.data);
      };
  
      fetchData();
    }, []);
 

    return (
      <View style={{ flex: 2, backgroundColor: "darkorange", justifyContent: 'center',}}>
        <Text>
          test
        </Text>
      </View>
    )
  }
      
*/

  //export default App;

  export default function App() {
    return <CoffeeAutonomous />;
  }

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
  },
    txt: {
      //flex: 1,
      padding: 20,
      margin: 10,
  },
});






{
  /*
const infoText = "..."

  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  redrow: {
    flex: 1, 
    backgroundColor: "red",
  },
  txt: {
    color: "yellow",
    margin: 10,
  },
  opacityButton: {
    color: "green",
    margin: 10,
  }
});



const Flex = () => {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      
      <View style={ styles.redrow }/>
      <View style={{ flex: 2, backgroundColor: "darkorange" }}>
        <Text style={styles.txt}>test</Text>
        
        <Button 
          color="#f194ff"
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button
          title="Lock status"
          
          onPress={() => {
            _onPressButton(); 
         }}  

        />
        <Text>{infoText}</Text>
        <TouchableOpacity onPress={_onPressButton}> 
        <Text style = {styles.opacityButton}>
          Dummy
        </Text>
      </TouchableOpacity >
      


      </View> 
      <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
  );
};

const _onPressButton = () => {
  return (
    <View>
      Alert.alert('Alrt Button pressed')
      getCarData('lockstatus')
      console.log("Ok")
    </View>
  );
}

const Alrt = () => {
  return (
    <View>
      Alert.alert('Alrt Button pressed')
      getCarData('lockstatus')
    </View>
  );
}
 

const App = () => {
  return (
    <View style={styles.container}>
    <Flex/>
    



    </View>

  );
}

export default Flex; */
}

{/* */}

    {/*
      <Text>Open up App.js to start working! on your app!</Text>
      <StatusBar style="auto" />
    */}
