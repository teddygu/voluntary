import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, Button, List, Avatar, DataTable } from 'react-native-paper';
import 'localstorage-polyfill';



class ProfileComponent extends React.Component {
  //read in stuff

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activityLength: 0,
      points: 0,
    }
  }

  componentDidMount() {
    let events = [];

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
      fetch('https://mh-api.owl.moe/api/v1/user/get_data', {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json()).then(data => {
        this.setState({ events: data.event_data.event_history });
        this.setState({ activityLength: data.event_data.event_history.length });
        this.setState({ points: data.points });
      });
    });
  }


  render() {
    let arr2 = ['No rewards available'];
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View>
              <Avatar.Text size={150} backgroundColor='lavender' label="XD"/>
          </View>
          <View style={{flex: 1, flexDirection: 'row', top: 40}}>
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>{this.state.activityLength}</Text>
              <Text style={{fontSize: 20}}>Completed Activities</Text>
            </View>         
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>{this.state.points}</Text>
              <Text style={{fontSize: 20}}>Total Points</Text>
            </View>   
          </View>
          <View style={{flex: 1, flexDirection: 'row', bottom: 100}}>
              <View style={{flex:1, alignItems:'center'}}>
                  <Text style={{fontSize: 20}}>Past Activities</Text>
                  <List.Accordion style={{width: 185}}>
                      { 
                          this.state.events.map((item) => (
                              <List.Item description={item.name} />
                          ))
                      }
                  </List.Accordion>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
                  <Text style={{fontSize: 20}}>Past Rewards</Text>
                  <List.Accordion style={{width: 185}}>
                      { 
                          arr2.map((item) => (
                              <List.Item description={item} />
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