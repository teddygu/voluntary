import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, Button, List, Avatar } from 'react-native-paper';
import ImagesExample from './sample-img.js';

const ProfileComponent = ({navigation}) => {
  //read in stuff
    return (
        <PaperProvider>
          <View style={styles.container}>
            <View>
                <Avatar.Text size={50} backgroundColor='lavender' label="XD"/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', top: 40}}>
              <View style={{flex:1, alignItems:'center'}}>
                <Text>Num Points</Text>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
                <Text>Num Activities</Text>
              </View> 
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

export default ProfileComponent;