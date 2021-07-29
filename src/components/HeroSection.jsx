import React from "react";
import Background from "./Background";
import { Input, Typography } from "antd";
import {useHistory} from 'react-router-dom'
export default function HeroSection() {
    const history = useHistory();
    return (
    <div>
      <Background
        style={{
          height: "calc(100vh - 64px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography.Title className="text-white">Travel Buddy</Typography.Title>
        <Typography.Text className="text-white"> Explore The <span className="fw-bold">Destination</span> </Typography.Text>
        <div
          className="container py-4"
          style={{ minWidth: "200px", width: "80%", maxWidth: "400px" }}
        >
            <Input.Search
              placeholder="Enter Destination"
              allowClear
              enterButton="Search"
              size="large"
              onSearch = {(value)=>{
                  history.push({
                      pathname: 'places',
                      search: `?${new URLSearchParams({name: value}).toString()}`
                  })
              }}
            />
        </div>
      </Background>
    </div>
  );
}
