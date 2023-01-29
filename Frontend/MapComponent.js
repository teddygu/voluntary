import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


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

      fetch('https://mh-api.owl.moe/api/v1/user/login_dummy', {
        method: 'POST',
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
    
            temp.push(<Marker
              key={val.event_id}
              coordinate={{
                latitude: val.latitude,
                longitude: val.longitude,
              }}
              title={val.event_details.name}
            />);
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