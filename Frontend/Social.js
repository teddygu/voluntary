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
          <Text style={{padding: 5}}>300</Text>
          <Image source={require('./assets/kudos_icon.png')} style={{width: 30, height: 30}}/>
      </Appbar.Header>

      <ScrollView>
        <DataTable style={{borderBottomColor: 'lavender', borderBottomWidth: 173}}>
          <DataTable.Header>
            <DataTable.Title>Rank</DataTable.Title>
            <DataTable.Title style={{left: 25}}>Username</DataTable.Title>
            <DataTable.Title style={{left: 35}}>Points Earned</DataTable.Title>
          </DataTable.Header>

          
          {this.state.leaderboard.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{index+1}</DataTable.Cell>
              <DataTable.Cell style={{left: 30}}>{item._id}</DataTable.Cell>
              <DataTable.Cell numeric>{item.points}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
    );
  }
};

export default Social;