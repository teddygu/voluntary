import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StackNavigator, Text } from 'react-native';
import { Provider as PaperProvider, Button, List, Banner, Appbar, Avatar } from 'react-native-paper';
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
      initials: "",
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
        this.setState({ initials: data.user_data.first_name[0] +  data.user_data.last_name[0]});
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
    var left = 50;
    var right = 90
    // fName = data.user_data.first_name;
    // points = data.points;
    var diff = 2500 - points % 2500;
    var msg;
    if(points >= 7500){
      msg = "Congratulations, you are the highest rank!"
    }
    else{
      msg = "You are " + diff + " points away from you next rank.";
    }

    if(points < 2500){
      path = <Bronze/>;
      rank = 'Bronze';
    }
    else if(points < 5000){
      path = <Silver/>;
      rank = 'Silver';
    }
    else if(points < 7500){
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
          <View style={{bottom: 20, left: 100}}>
            <Avatar.Text size={45} backgroundColor='lavender' label={this.state.initials}/>
          </View>
          <View style={{flex: 1, flexDirection: 'column', top: 0}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 30, right: 0, fontStyle: 'italic'}}>Welcome back {this.state.name}!</Text>
            </View>
            <View style={{top: 20, left: 50}}>
                {path}
            </View>
            <View>
              <Text style={{fontSize: 15, left: 100, top: 30}}>Current Rank: {rank}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={{top:0, height: 16, lexDirection: "row", width: 2500 - diff, backgroundColor: 'lavender'}}/>
            </View>
            <View>
              <Text style={{fontSize: 15, left: 30, top: 50}}>{msg}</Text>
            </View>
            <Text Text style={{fontWeight: 'bold', top: 70, fontSize: 20, left: 60, fontStyle: 'italic'}}>Top Events In Your Area</Text>
            <Text Text style={{top: 65, left: 50}}>(organization name + past participants)</Text>
          </View>
          <StatusBar style="auto" />
          <View style={{flex: 1, flexDirection: 'row', top: 65}}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{width: 425}}>
                    { 
                        this.state.activities.map((item, i) => (
                          <List.Item style={{left: 50, top: 30}} description={i + 1 + '. ' + item.event_details.name + ' - ' + item.participant_count} />
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
    paddingTop: 50,
    borderWidth: 20,
    borderColor: 'lavender',
    headers: 'lavender',
    borderTopWidth: 50
  },
   progressBar: {
    height: 20,
    lexDirection: "row",
    width: 250,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    top: 45,
    left: 50
  }
});

export default HomeComponent;
