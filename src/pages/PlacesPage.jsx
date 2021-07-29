import React from "react";
import HomeLayout from "../components/Layouts/HomeLayout";
import getLocation from "../helpers/location";
import { setLocation } from "../app/locationSlice";
import { setMarkers } from "../app/markersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import Map from "../components/Map";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PlaceCard from "../components/PlaceCard";

function Spinner() {
  return (
    <div className="mx-auto my-auto">
      <Spin />
    </div>
  );
}

function PlacesSection() {
  const location = useSelector((state) => state.location);

  let query = new URLSearchParams(useLocation().search);

  const { data, isLoading, isError } = useFetch("places", {
    name: query.get("name") || "",
    lat: location.coordinates[0],
    lon: location.coordinates[1],
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    <div className="text-danger">Error</div>;
  }

  if (data) {
    setMarkers(data.data || []);
    return (
      <>
        <div className="py-4">
          <Map coordinates={location.coordinates} places={data.data}/>
        </div>
        <div className="container-fluid py-4 gy-4 row">
          {data.data.map((place) => (
            <div className="col-lg-3 col-md-6">
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return <Spinner />;
}

export default function PlacesPage() {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();

  if (!location.hasLocation) {
    getLocation().then((coordinates) => {
      dispatch(setLocation(coordinates));
    });
  }

  if (!location.hasLocation) {
    return (
      <HomeLayout>
        <Spinner />
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <PlacesSection />
    </HomeLayout>
  );
}
