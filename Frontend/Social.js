import * as React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, SegmentedButtons, DataTable } from 'react-native-paper';
import MapComponent from './MapComponent';

const Stack = createNativeStackNavigator();



class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
    }
  }
  
  
  componentDidMount() {
    fetch('https://mh-api.owl.moe/api/v1/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: localStorage.username,
        password: localStorage.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json()).then(data => {
      fetch('https://mh-api.owl.moe/api/v1/stats/leaderboard', {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json()).then(data => {
        this.setState({ leaderboard: data });
      });
    });
  }

  render() {
    return (  
    <View style={{borderWidth: 20, borderColor: 'lavender'}}>
      <Appbar.Header style={{backgroundColor: 'lavender'}}>
          <Appbar.Content title="Leaderboard" />
      </Appbar.Header>

      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Rank</DataTable.Title>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Points Earned</DataTable.Title>
          </DataTable.Header>

          
          {this.state.leaderboard.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{index+1}</DataTable.Cell>
              <DataTable.Cell>{item._id}</DataTable.Cell>
              <DataTable.Cell numeric>{item.points}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
    );
  }

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