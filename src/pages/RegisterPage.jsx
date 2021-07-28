import React from "react";
import Background from "../components/Background";
import HomeLayout from "../components/Layouts/HomeLayout";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";


export default function RegisterPage() {
  return (
    <HomeLayout>
      <Background>
        <div
          className="card mx-auto my-auto p-4"
          style={{ minWidth: "200px", width: "100%", maxWidth: "600px" }}
        >
          <div className="card-header">
            <Typography.Title level={4} className="text-center my-auto">
              Register
            </Typography.Title>
          </div>
          <div className="card-body">
            <RegisterForm />
            <div className="text-center py-3 ">
              Already A User? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </Background>
    </HomeLayout>
  );
}
