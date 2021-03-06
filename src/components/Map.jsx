import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  useMapEvent,
} from "react-leaflet";
import {Link} from 'react-router-dom'
import getLocation from "../helpers/location";
import { setLocation, } from "../app/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";

function MapControl({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  return null;
}

export default function Map({ places = [], center }) {
  const location = useSelector((store) => store.location);
  const [zoom, setZoom] = useState(2);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (!location.hasLocation) {
      getLocation().then((pos) => {
        dispatch(setLocation(pos));
      });
    }
    if (location.hasLocation) {
      setZoom(17);
    }
  }, [location]);

  if(location.hasLocation){
    
    return (
      <MapContainer
        center={center || location.coordinates}
        zoom={zoom}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location.coordinates}>
          <Popup>Your Location</Popup>
        </Marker>
        {places.map((place) => (
          <Marker position={[place.location.coordinates[1], place.location.coordinates[0]]} key={place._id}>
            <Popup>
              <Link to={`/places/${place.id}`}>
                {place.name}
              </Link>
            </Popup>
          </Marker>
        ))}
        <MapControl center={center || location.coordinates} zoom={zoom} />
      </MapContainer>
    );
  }
  return <Spinner />
}