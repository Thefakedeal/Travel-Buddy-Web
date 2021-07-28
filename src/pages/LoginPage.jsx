import React from "react";
import { Typography, Input, Button } from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import HomeLayout from "../components/Layouts/HomeLayout";
import {Link} from 'react-router-dom'
import Background from "../components/Background";
import { Formik, Field } from "formik";

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
            <Formik
              initialValues={
                {
                  email:'',
                  password:''
                }
              }
              onSubmit={(values)=>{
                console.log(values)
              }}
            >
              {({values, handleSubmit, handleChange, handleBlur, isSubmitting})=>(
               
               <div>
              
               <div className="row align-items-center py-2">
                 <div className="col-md-3">Email <span className="text-danger">*</span></div>
                 <div className="col-md-9">
                   <Field
                     component={Input}
                     name="email"
                     onChange={handleChange("email")}
                     prefix={<UserOutlined />}
                     placeholder="Email"
                   />
                 </div>
               </div>
               <div className="row align-items-center py-2">
                 <div className="col-md-3">Password <span className="text-danger">*</span></div>
                 <div className="col-md-9">
                   <Field
                     component={Input.Password}
                     name="password"
                     onChange={handleChange("password")}
                     prefix={<LockOutlined />}
                     placeholder="Password"
                   />
                 </div>
               </div>
               
               <div className="py-4">
                 <Button
                   className="float-end"
                   onClick={handleSubmit}
                   type="primary"
                   disabled={isSubmitting}
                 >
                   <UserOutlined /> Login
                 </Button>
               </div>
             </div>
               
              )}
            </Formik>
            <div className="text-center ">
                Not A User? <Link to="/register">Register</Link> 
            </div>
          </div>
        </div>
      </Background>

    </HomeLayout>
  );
}
