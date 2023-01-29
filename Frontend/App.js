import { StyleSheet, View, Text, Image } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import BottomNav from './BottomNav';
import Login from './Login';
import haversine from 'haversine-distance'
import 'localstorage-polyfill';

export default function App({loggedIn}) {

  localStorage.username = 'User1';
  localStorage.password = 'somepw'

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
    fetch('https://mh-api.owl.moe/api/v1/event/get_nearby', {
      method: 'POST',
      body: JSON.stringify({
        latitude: 44.973664,
        longitude: -93.234988,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json()).then(data => {
      data.forEach(event => {
        if (haversine({ latitude: 44.973664, longitude: -93.234988 }, { latitude: event.latitude, longitude: event.longitude }) < 500) {
          fetch('https://mh-api.owl.moe/api/v1/event/join', {
            method: 'POST',
            body: JSON.stringify({
              latitude: 44.973664,
              longitude: -93.234988,
              event_id: event.event_id
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }).then(response => response.json()).then(data => {});
        }
      });
    });
  });

  var loggedIn = false;
  Login();
  return (
    <PaperProvider>
      {!loggedIn && <Login />}
      {loggedIn && <BottomNav />}
    </PaperProvider>
  );
}

