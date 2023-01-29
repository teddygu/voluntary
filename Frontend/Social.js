import * as React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, SegmentedButtons, DataTable } from 'react-native-paper';
import MapComponent from './MapComponent';

const Stack = createNativeStackNavigator();



const Social = ( { navigation }) => {
    const [value, setValue] = React.useState('');
    const [global, setGlobal] = React.useState(true);
    
    return (  
    <View>
        
        <Appbar.Header>
            <Appbar.Content title="Social" />
        </Appbar.Header>
        

        <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            label: 'Global',
            onPress: () => setGlobal(true)
          },
          {
            label: 'Friends',
            onPress: () => setGlobal(false)
          }
        ]}
      />
      {global && 
      <ScrollView>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Rank</DataTable.Title>
        <DataTable.Title>Username</DataTable.Title>
        <DataTable.Title>Points Earned</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>1</DataTable.Cell>
        <DataTable.Cell>llamakking</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>2</DataTable.Cell>
        <DataTable.Cell>weijini</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>
      </DataTable>
      </ScrollView>
      
      }
      {!global && 
      <Text>Friends</Text>}
    </View>
    
    );

    // function Global() {
    //     console.log("global");
    
    //     return (
    //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <Text>Global</Text>
    //       </View>
    //     );
    //   }
    
    // function Friends() {
    //     console.log("friends");
    
    //     return (
    //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <Text>Friends</Text>
    //       </View>
    //     );
    //   }
};

export default Social;