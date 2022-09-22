import * as React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';


TaskManager.defineTask('YOUR_TASK_NAME', ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
})




const LATITUDE = 43.653225;
const LONGITUDE = -79.383186;
export default function App() {
  const [coordinates] = useState([
    {
      latitude: 43.7860253, longitude: -79.2936040,
      //home
    },
    {
      latitude: 43.7851554, longitude: -79.2934172,
      //library
    },
    {
      latitude: 43.7843101, longitude: -79.2913043,
      //walmart
    },
    {
      latitude: 43.7862644, longitude: -79.2913092,
      //158 bonis avenue
    },
    {
      latitude: 43.7860253, longitude: -79.2936040,
      //home,coordinates should be a circle if want to be the starting point
    },
  ]); 

  const origin = {latitude: 43.791680, longitude: -79.312770};
  const destination = {latitude: 43.785230, longitude: -79.293420};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBpAexI1D_HPIrR9xz_RqAAKDNlYKmW0Q8';


  useEffect(() => {
    (async () => {
      console.log("success")
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === 'granted') {
        await Location.startGeofencingAsync("YOUR_TASK_NAME", [
          {
            latitude: 43.7860253, longitude: -79.2936040,"radius": 20,
            //home
          },]);
      }
    })
      
  }, []);

 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        provider={"google"}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[coordinates.length-1]}
          mode="WALKING"
          waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): undefined}
          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <Marker coordinate={coordinates[2]} />
        <Marker coordinate={coordinates[3]} />
      </MapView>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
})