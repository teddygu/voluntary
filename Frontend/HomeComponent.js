import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StackNavigator, Text } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import Platinum from './Plat.js';
import Gold from './Gold.js';
import Silver from './Silver.js';
import Bronze from './Bronze.js';
import React, {useState, useEffect} from "react"


class HomeComponent extends React.Component {
  //read in stuff
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      points: 0,
      activities: []
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
      fetch('https://mh-api.owl.moe/api/v1/user/get_data', {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json()).then(data => {
        this.setState({ name: data.user_data.first_name });
        this.setState({ points: data.points });
      });
    });

    fetch('https://mh-api.owl.moe/api/v1/event/get_nearby', {
      method: 'POST',
      body: JSON.stringify({
        latitude: 44.970636,
        longitude: -93.223282
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json()).then(data => {
      data.sort((a, b) => (a.participant_count > b.participant_count) ? -1 : 1);
      var activity = [data[0], data[1], data[2]]
      this.setState({ activities: activity})
    });
  }
  
  render(){
    var points = this.state.points;
    var path;
    var rank;
    // fName = data.user_data.first_name;
    // points = data.points;
    var diff = 250 - points % 250;
    var msg;
    if(points >= 750){
      msg = "Congratulations, you are the highest rank!"
    }
    else{
      msg = "You are " + diff + " points away from you next rank.";
    }

    if(points < 250){
      path = <Bronze/>;
      rank = 'Bronze';
    }
    else if(points < 500){
      path = <Silver/>;
      rank = 'Silver';
    }
    else if(points < 750){
      path = <Gold/>;
      rank = 'Gold';
    }
    else{
      path = <Platinum/>
      rank = 'Platinum';
    }
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: 'column', top: 40}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 30, right: 30, fontStyle: 'italic'}}>Welcome back {this.state.name}!</Text>
            </View>
            <View style={{top: 20}}>
                {path}
            </View>
            <View>
              <Text style={{fontSize: 15, top: 30}}>Current Rank: {rank}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={{top:0, height: 16, lexDirection: "row", width: 250 - diff, backgroundColor: 'lavender'}}/>
            </View>
            <View>
              <Text style={{fontSize: 15, top: 50}}>{msg}</Text>
            </View>
            <Text Text style={{fontWeight: 'bold', top: 60, fontSize: 20, right: 30, fontStyle: 'italic'}}>Top Events In Your Area</Text>
          </View>
          <StatusBar style="auto" />
          <View style={{flex: 1, flexDirection: 'row', top: 80}}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{width: 425}}>
                    { 
                        this.state.activities.map((item, i) => (
                          <List.Item style={{left: 40, top: 30}} description={i + 1 + '. ' + item.event_details.name + ' - ' + item.participant_count} />
                      ))
                    }
                </View>
            </View>
          </View>
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
  },
   progressBar: {
    height: 20,
    lexDirection: "row",
    width: 250,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    top: 45
  }
});

export default HomeComponent;
