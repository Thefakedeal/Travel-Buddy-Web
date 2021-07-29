import React from "react";
import { Card, Meta } from "antd";
import { useHistory } from 'react-router-dom';

export default function PlaceCard({ place }) {
  const history = useHistory();
  return (
    <Card
     onClick={()=>{
       history.push(`/places/${place._id}`)
     }}
      cover={
        <div style={{ paddingTop: "66.6%",
        backgroundImage: `url('${place.image}')`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}></div>
      }
    >
      <Card.Meta
       
        title={place.name}
        description={place.description}
      />
    </Card>
  );
}
