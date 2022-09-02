import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';

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
          title="Press me too"
          onPress={() => Alrt()}
        />
        <Text>{infoText}</Text>
        <TouchableOpacity onPress={_onPressButton}> 
        <Text style = {styles.opacityButton}>
          button name
        </Text>
      </TouchableOpacity >

      {getLockStatus()}

      </View> 
      <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
  );
};

const _onPressButton = () => {
  return (
    Alert.alert('Alrt Button pressed')
  );
}


const Alrt = () => {
  return (
    Alert.alert('Alrt Button pressed')
  );
}

const getLockStatus = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('http://192.168.1.190:8000/?func=lockstatus')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    Alert.alert("ok") 
  );
}

  


 {/* */}

const App = () => {
  return (
    <View style={styles.container}>
    <Flex/>
    
    {/*
      <Text>Open up App.js to start working! on your app!</Text>
      <StatusBar style="auto" />
    */}



    </View>

  );
}

export default Flex;