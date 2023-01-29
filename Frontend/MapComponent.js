import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const MapComponent = () => {
  const [location, setLocation] = useState(null);
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
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  }

  let markers = this.state.volunteerLocations.map(volunteerLocation => (
    <MapView.Marker
      key={volunteerLocation.id}
      coordinate={{
        latitude: volunteerLocation.lat,
        longitude: volunteerLocation.lng,
      }}
      title={volunteerLocation.title}
    />
  ));

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
    {!location && 
    <Text>{text}</Text>
    }
    {location &&
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
        {markers}
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