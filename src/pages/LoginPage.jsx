import React from "react";
import { Typography, Form, Input, Button } from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import HomeLayout from "../components/Layouts/HomeLayout";
import {Link} from 'react-router-dom'
import Background from "../components/Background";
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
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },

                ]}
              >
                <Input prefix={<UserOutlined />}  placeholder="Email"/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password prefix={<LockOutlined/>}  placeholder="Password"/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center ">
                Not A User? <Link to="/register">Register</Link> 
            </div>
          </div>
        </div>
      </Background>

    </HomeLayout>
  );
}
