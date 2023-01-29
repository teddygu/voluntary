import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import ImagesExample from './sample-img.js'

export default function App() {
  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex:1, alignItems:'center'}}>
            <Button disabled={true}>
            </Button>
          </View>
          <View style={{flex:1, alignItems:'center'}}>
            <Button icon="settings-helper" style={{backgroundColor: 'gray', textColor: 'white'}} onPress={() => console.log('Pressed')}>
              Settings
            </Button>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'column', bottom: 325}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 30, right: 50, fontStyle: 'italic'}}>Good morning David!</Text>
          </View>
          <View>
            <ImagesExample/>
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
  }
});
