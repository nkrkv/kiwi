import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap(({lat, lon}) =>
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: lat, lng: lon }}>
    <Marker position={{ lat: lat, lng: lon }} />
  </GoogleMap>
))

export default function Map({lat, lon}) {
  return (
    <MapComponent
      lat={lat}
      lon={lon}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `450px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
