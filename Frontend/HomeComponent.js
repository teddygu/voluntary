import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StackNavigator, Text } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import ImagesExample from './sample-img.js';

const HomeComponent = ({navigation}) => {
  //read in stuff
    return (
        <PaperProvider>
          <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'column', top: 40}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 30, right: 50, fontStyle: 'italic'}}>Good morning David!</Text>
              </View>
              <View>
                <ImagesExample/>
              </View>
              <View style={styles.progressBar}>
                <View style={{height: 16, lexDirection: "row", width: 150, backgroundColor: 'lavender'}}/>
              </View>
              <View>
                <Text>You're X points away from the next rank!</Text>
              </View>
              <Text style={{fontWeight: 'bold', top: 30, fontSize: 20}}>Top Events in your Area</Text>
            </View>
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 50
  },
   progressBar: {
    height: 20,
    lexDirection: "row",
    width: 300,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  }
});

export default HomeComponent;
