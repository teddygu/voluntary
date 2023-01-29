import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import  { Component } from 'react';
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
      userData: {},
      initials: ''
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
        this.setState({ userData: data.user_data });
        this.setState({ initials: data.user_data.first_name[0] + data.user_data.last_name[0] });
      });
    });
  }




  render() {
    let arr2 = ['No rewards available','wee','ree','shee'];
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View>
            <Text></Text>
            <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>{this.state.userData.first_name} {this.state.userData.last_name}</Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>{localStorage.username}</Text>
            <Text></Text>
          </View>
          <View>
              <Avatar.Text size={150} backgroundColor='beige' label={this.state.initials}/>
          </View>
          <View style={{flex: 1, flexDirection: 'row', top: 40, backgroundColor: '#fff'}}>
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>{this.state.activityLength}</Text>
              <Text style={{fontSize: 20, left: 20}}>Completed Activities</Text>
            </View>        


            <View style={{flex:1, alignItems:'center',}}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>{this.state.points}</Text>
              <Text style={{fontSize: 20}}>Total Points</Text>
            </View>  
          </View>
          <View style={{flex: 1, flexDirection: 'row', bottom: 100,}}>
              <View style={{flex:1, alignItems:'center'}}>
                  <Text style={{fontSize: 20}}>Past Activities</Text> 
                  <View style={{width: 190, left: 3, top: 7, backgroundColor: '#fff'}}>
                      {
                          this.state.events.map((item) => (
                              <List.Item description={item.name} key={item.event_id}/>
                          ))
                      }
                  </View>
              </View>
              <View style={{flex:1, alignItems:'center',backgroundColor: '#fff'}}>
                  <Text style={{fontSize: 20, 
                     backgroundColor: '#fff'}}>Past Rewards</Text>
                  <View style={{width: 150, left: 8, top:36, backgroundColor: '#fff',}}>
                        <Text>
                          No Purchased Awards
                        </Text>
                  </View>
                  <View style={{width: 185, left: 1, top: 38,  backgroundColor: '#fff'}}>
                        <Text style={[styles.setColorWhite,styles.setFontSize]}>
                        Beep
                        </Text>
                  </View>  
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
    backgroundColor:'lavender',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 50,
    borderWidth: 20,
    borderColor: 'lavender'
  },
  setColorWhite: {
    color: '#fff'
  },
  setFontSize: {
    fontSize: 82,
  }


});


export default ProfileComponent;

