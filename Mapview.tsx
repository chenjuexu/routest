import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useState } from 'react';

export  default function Mapview(props:any){
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBpAexI1D_HPIrR9xz_RqAAKDNlYKmW0Q8';
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
 

    return(
        <MapView
        style={props.styles.maps}
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
          waypoints={ (coordinates.length > 2) ?coordinates.slice(1, -1): undefined}
          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <Marker coordinate={coordinates[2]} />
        <Marker coordinate={coordinates[3]} />
      </MapView>
    ) 
  

}