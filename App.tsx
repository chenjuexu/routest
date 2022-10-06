import * as React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState,useLayoutEffect } from 'react';
import * as Location from "expo-location";
import * as turf from '@turf/turf';
import distance from '@turf/distance';
import {Units} from '@turf/helpers/dist/js';




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

  const [location, setLocation] = useState({});

  useEffect(() => {
  
const foo=async () => {     
      let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
         console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        setLocation(location)
        console.log(location)// working,but two output LocationObject
        var from = turf.point([location.coords.latitude,  location.coords.longitude]);
        var to = turf.point([coordinates[0].latitude,  coordinates[0].longitude]);

        /*1 var options = {units: 'miles' as const} ;
        var distance = turf.distance(from, to, options);
        reference:https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type

        https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type

        what is "?:" in typescript:https://stackoverflow.com/questions/63522675/what-is-the-difference-between-and-in-typescript-object-definitions
        */
        /*2 var distance = turf.distance(from, to, { units: 'meters' })*/
        /*3 
        outofdate,not working;typescript not like javascript which change slowly
        type Units =typeof Units ;
       
        var mytype:string='meters';
        var options:Units=mytype as Units
        
        var distance = turf.distance(from, to, options)*/
        //;
        var distance = turf.distance(from, to, { units: 'meters' })
        console.log(distance)
      }
      foo();


  }, []);
  let text = 'Waiting..';
  if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
       <Text>{text}</Text> 
       {console.log('a')/*add this to know wen to paiting for browser */ }
       {console.log(location)}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
})