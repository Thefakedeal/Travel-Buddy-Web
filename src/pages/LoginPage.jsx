import React from "react";
import { Typography} from "antd";
import HomeLayout from "../components/Layouts/HomeLayout";
import {Link} from 'react-router-dom'
import Background from "../components/Background";
import LoginForm from '../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <HomeLayout>
      <Background>
        <div className="card mx-auto my-auto p-4" style={{ minWidth:"200px", width:"100%", maxWidth:"600px" }}>
          <div className="card-header">
            <Typography.Title level={4} className="text-center my-auto">
                Login
            </Typography.Title>
          </div>
          <div className="card-body">
            <LoginForm />
            <div className="text-center ">
                Not A User? <Link to="/register">Register</Link> 
            </div>
          </div>
        </div>
      </Background>

    </HomeLayout>
  );
}
