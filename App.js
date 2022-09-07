import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import React, { Component, useState } from 'react';
import netc from './netcall.js';

function PressLockStatus(what) {
  
  //console.log(what)
  alert('You tapped the button!')
}

export default class phevInfo extends Component {

  _functionOne(){
    netc.nc('ok');
    };
  _functionLockstatus(){
      netc.nc('lockstatus');
      };
   

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._functionLockstatus}
            title="Lockstatus"
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
});


{/*
const infoText = "..."

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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

export default Flex; */}

{/* */}

    {/*
      <Text>Open up App.js to start working! on your app!</Text>
      <StatusBar style="auto" />
    */}
