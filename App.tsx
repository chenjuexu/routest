import * as React from 'react';
//import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState,useLayoutEffect } from 'react';
import * as Location from "expo-location";


const LATITUDE = 43.653225;
const LONGITUDE = -79.383186;
export default function App() {
 /* const [coordinates] = useState([
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
*/
  const [location, setLocation] = useState({});

  useEffect(() => {
    /*
  (async () => {     
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
       console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)//not working 
    })*/
    /*const foo=async () => {     
      let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
         console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
      }
      foo();//output:Permission to access location was denied
      */
      // the below way use usestate,sater way
/*const foo=async () => {     
      let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
         console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        setLocation(location)
        console.log(location)// working,but two output LocationObject
      }
      foo();
      
*/

/*const foo=async () => {     
      
        let location = await Location.getCurrentPositionAsync();
        setLocation(location)
        console.log(location)// empty output
      }
    
      */


 /*(async () => {     
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
       console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)//not show
    })*/

   /* const foo=async () => {     
    
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
      }
      foo();//not show
      */

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
      {/*<MapView
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
      </MapView>*/}
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
  /*maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },*/
})




/*

below is the not safe way to console within useeffect promiste

import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";


export default function App() {


   useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();


      if (status !== 'granted') {
       console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
console.log(location)
   
   }
    )();
  }, []);

  return (
    <View style={styles.container}>
      <Text>To share a photo from your phone with a friend, just press the button below!</Text>    
      {console.log('a')}
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
});

*/