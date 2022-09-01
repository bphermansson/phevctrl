import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

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
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View> 
      <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
  );
};

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