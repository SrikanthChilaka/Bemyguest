import {useLoadScript} from '@react-google-maps/api';
import { useSelector } from 'react-redux';

export default function LoadMapScripts(libraries){
   const googleMapsAPIKey = useSelector(state => state.apiManagement.googleMapsAPIKey);
   const {isLoaded} = useLoadScript({
      googleMapsApiKey: googleMapsAPIKey,
      libraries
    })
    return isLoaded;
}