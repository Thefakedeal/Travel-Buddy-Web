import React, { useState } from "react";
import { FaRedhat } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { Drawer, Layout, List, Button, Menu, Typography } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { logout } from "../helpers/auth";
import useAuth from "../hooks/useAuth";

const routes = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Places",
    href: "/places",
  },
  {
    title: "Add Place",
    href: "/places/create",
  }
];

const SideDrawer = ({ visible, onClose }) => {
  const hisory = useHistory();
  const { user, setToken } = useAuth();
  return (
    <Drawer placement="right" visible={visible} onClose={onClose}>
      <List>
        {routes.map((route) => (
          <List.Item
            onClick={() => {
              hisory.push(route.href);
            }}
            key={route.title}
          >
            <Link to={route.href}>{route.title}</Link>
          </List.Item>
        ))}

        {user ? (
          <List.Item
            onClick={async () => {
              const success = await logout();
              if (success) {
                setToken(null);
              }
            }}
            key="logout"
          >
            <div to="/">Logout</div>
          </List.Item>
        ) : (
          <List.Item
            onClick={() => {
              hisory.push("/login");
            }}
            key="login"
          >
            <Link to="/login">Login</Link>
          </List.Item>
        )}
      </List>
    </Drawer>
  );
};

const Links = () => {
  const { user, setToken } = useAuth();

  return (
    <Menu
      mode="horizontal"
      selectable={false}
      className="d-flex flex-wrap"
      theme="dark"
    >
      {routes.map((route) => (
        <Menu.Item>
          <Link to={route.href} key={route.title} className="d-none d-lg-block">
            <span className="text-decoration-none text-white ">
              {route.title}
            </span>
          </Link>
        </Menu.Item>
      ))}
      {user ? (
        <Menu.Item
          onClick={async () => {
            const success = await logout();
            if (success) {
              setToken(null);
            }
          }}
        >
          <div to="." key="logout" className="d-none d-lg-block">
            <span className="text-decoration-none text-white ">Logout</span>
          </div>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Link to="/login" key="login" className="d-none d-lg-block">
            <span className="text-decoration-none text-white ">Login</span>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  return (
    <Layout.Header className="nav d-flex justify-content-between align-items-center px-4 py-0">
      <div className="py-auto" onClick={()=>{
        history.push('/');
      }}>
        <FaRedhat className="text-white fs-1" />
        <Typography.Text className="px-2 fs-6 text-white d-none d-lg-inline-block">
          Travel Buddy
        </Typography.Text>
      </div>
      <Links />
      <Button
        type="text"
        className="d-flex align-items-center d-lg-none fs-4 text-white py-auto"
        onClick={() => {
          setVisible((visible) => !visible);
        }}
      >
        {visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <SideDrawer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </Layout.Header>
  );
}
