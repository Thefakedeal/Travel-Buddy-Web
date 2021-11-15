import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

import { setMarker, setNull } from '../app/clickedMarkerSlice'
import getLocation from "../helpers/location";
import { setLocation, } from "../app/locationSlice";
import { useSelector, useDispatch } from "react-redux";

function MapControl({ center, zoom }) {
    const dispatch = useDispatch();
    const map = useMapEvent('click',e=>{
        dispatch(setMarker({lat:e.latlng.lat, lon:e.latlng.lng}))    
    })
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  useEffect(()=>{
    return dispatch(setNull())
  },[])

  return null;
}

export default function AddMap() {
  const location = useSelector((store) => store.location);
  const clicked = useSelector((store) => store.clickedMarker);
  const [zoom, setZoom] = useState(2);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.hasLocation) {
      getLocation().then((pos) => {
        dispatch(setLocation(pos));
      });
    }
    if (location.hasLocation) {
      setZoom(13);
    }
  }, [location]);

  return (
    <MapContainer
      center={location.hasLocation? location.coordinates : [26.8065,87.2846]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(clicked.lat && clicked.lon) && (
        <Marker position={[clicked.lat, clicked.lon]}>
          <Popup>Your Clicked Location</Popup>
        </Marker>
      )}

      <MapControl center={location.hasLocation? location.coordinates : [26.8065,87.2846]} zoom={zoom} />
    </MapContainer>
  );
}
