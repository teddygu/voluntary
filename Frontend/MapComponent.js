import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import 'localstorage-polyfill'

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let position = await Location.getCurrentPositionAsync({});
      setLocation(position);

      localStorage.username = 'User1';
      localStorage.password = 'somepw';



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
      })
      .then(response => response.json())
      .then(data => {
        fetch('https://mh-api.owl.moe/api/v1/event/get_nearby', {
          method: 'POST',
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
          //alert(JSON.stringify(data));
          //console.log(JSON.stringify(data));
          let temp = [];
          data.forEach(val => {
            //console.log(val);
            let icon = '';
            if (val.is_participating) icon = require('./img/marker_green.png')
            temp.push(<Marker
              key={val.event_id}
              icon={icon}
              coordinate={{
                latitude: val.latitude,
                longitude: val.longitude,
              }}
            >
            <Callout tooltip>
              <View style={{backgroundColor: 'white', maxWidth: 350, maxHeight: 600, borderRadius: 25, padding: 20 }}>
                <Text numberOfLines= {4} style={{fontFamily: 'Verdana-Bold', fontWeight: 'bold', fontSize: 15, textAlign: 'center',}}>{val.event_details.name}</Text>
                <Text numberOfLines= {12} style={{fontFamily: 'Verdana',textAlign: 'center', numberOfLines: 1}}>{val.event_details.description}</Text>
                <Text numberOfLines= {4} style={{fontFamily: 'Verdana-BoldItalic',textAlign: 'center', numberOfLines: 1, fontStyle: 'italic'}}>Worth {val.points_worth} Points{}</Text>
              </View>
            </Callout>
            </Marker>

            );
          });
          setMarkers(temp);
          //console.log(JSON.stringify(markers));
        });
      });

    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  }

 

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
    {!location && !markers &&
    <Text>{text}</Text>

    }
    {location && markers &&
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (marker
        ))}
      </MapView>
    }
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;