import * as React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState, useMemo } from 'react';
import * as Location from "expo-location";
import * as turf from '@turf/turf';
import Waiting from './Waiting';
import Checkifarrival from './Checkifarrival';
import Mapview from './Mapview';






export default function App() {
  const coordinates = [
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
  ]
  
  const [location, setLocation] = useState({});
  const [distance,setDistance]=useState({});
 
 
  
  useEffect(() => {
    const getDistance=async ()=>{

      var { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
      const location = await Location.getCurrentPositionAsync();
      var from = turf.point([location.coords.latitude, location.coords.longitude]);
      var to = turf.point([coordinates[0].latitude, coordinates[0].longitude]);
      var distance = turf.distance(from, to, { units: 'meters' }); 
      setLocation(location);
      setDistance(distance);
      console.log(location);
      console.log(distance);

    }
      getDistance();
      
      // working,but two output LocationObject
      //var from = turf.point([location.coords.latitude, location.coords.longitude]);
      //var to = turf.point([coordinates[0].latitude, coordinates[0].longitude]);

      //var distance = turf.distance(from, to, { units: 'meters' })
     // console.log(typeof distance)     
    
  }, []);

  /*let text = 'Waiting..';
  if (location) {
    text = JSON.stringify(location);
  }*///test location value,if want to test,just unmark
/*useMemo((distance:number)=>{
      var from = turf.point([location.coords.latitude, location.coords.longitude]);
      var to = turf.point([coordinates[0].latitude, coordinates[0].longitude]);

      return distance = turf.distance(from, to, { units: 'meters' })
      console.log(typeof distance)
},[distance])

*/

 
  return (

    <View style={styles.container}>
      {/*<Text>{text}</Text> //if want to test location value,unmark*/}
      {/*console.log('a')//add this to know wen to paiting for browser,if want to test location value,unmark*/}
      {/*console.log(location) //if want to test location value,unmark*/}
      {(Object.keys(location).length===0) && <Waiting />}
      {/*logical “and” operator && will return the right side of the condition if the left side is truthy*/}
      
      { (distance<20)&&<Mapview styles={styles} />}
      
      {(distance>=20)&&<Checkifarrival />}

      


    </View>

  )
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