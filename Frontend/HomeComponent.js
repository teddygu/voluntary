import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StackNavigator, Text } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import Platinum from './Plat.js';
import Gold from './Gold.js';
import Silver from './Silver.js';
import Bronze from './Bronze.js';

const HomeComponent = ({navigation}) => {
  //read in stuff
    var path = <Bronze/>;
    const arr1 = ["abc - 10/10/10 - 123 st", "def - 10/10/10 - 123 st", "ghi - 10/10/10 - 123 st"];
    return (
        <PaperProvider>
          <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'column', top: 40}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>Welcome back David!</Text>
              </View>
              <View style={{top: 20, alignItems: 'center'}}>
                  {path}
              </View>
              <View>
                <Text style={{fontSize: 15, textAlign: 'center', top: 30}}>Current Rank: Plat</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={{top:0, height: 16, lexDirection: "row", width: 150, backgroundColor: 'lavender'}}/>
              </View>
              <View>
                <Text style={{fontSize: 15, top: 50, textAlign: 'center'}}>You're X points away from the next rank!</Text>
              </View>
              <Text Text style={{fontWeight: 'bold', top: 60, fontSize: 20, textAlign: 'center'}}>Top Events In Your Area</Text>
            </View>
            <StatusBar style="auto" />
            <View style={{flex: 1, flexDirection: 'row', top: 80}}>
              <View style={{flex:1, textAlign: 'center'}}>
                  <View style={{width: 425}}>
                      { 
                          arr1.map((item, i) => (
                              <List.Item description={i + 1 + ". " + item} />
                          ))
                      }
                  </View>
              </View>
            </View>
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
    borderRadius: 5,
    top: 45
  }
});

export default HomeComponent;
