import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, Button, List, Avatar, DataTable } from 'react-native-paper';

const ProfileComponent = () => {
  //read in stuff
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const arr1 = [1,2,3];
    const arr2 = [4,5,6];
    return (
        <PaperProvider>
          <View style={styles.container}>
            <View>
                <Avatar.Text size={150} backgroundColor='lavender' label="XD"/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', top: 40}}>
              <View style={{flex:1, alignItems:'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>500</Text>
                <Text style={{fontSize: 20}}>Completed Activities</Text>
              </View>         
              <View style={{flex:1, alignItems:'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>500</Text>
                <Text style={{fontSize: 20}}>Total Points</Text>
              </View>   
            </View>
            <View style={{flex: 1, flexDirection: 'row', bottom: 100}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontSize: 20}}>Past Activities</Text>
                    <List.Accordion style={{width: 185}}>
                        { 
                            arr1.map((item) => (
                                <List.Item title={item} />
                            ))
                        }
                    </List.Accordion>
                </View>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontSize: 20}}>Past Rewards</Text>
                    <List.Accordion style={{width: 185}}>
                        { 
                            arr2.map((item) => (
                                <List.Item title={item} />
                            ))
                        }
                    </List.Accordion> 
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