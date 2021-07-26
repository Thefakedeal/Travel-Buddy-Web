import React, { useState } from "react";
import {FaRedhat} from 'react-icons/fa'
import { Link, useHistory } from "react-router-dom";
import { Drawer, Layout, List, Button, Menu , Typography} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const routes = [
  {
    title: "Home",
    href: "/",
  },
];

const SideDrawer = ({ visible, onClose }) => {
  const hisory = useHistory();
  return (
    <Drawer placement="right" visible={visible} onClose={onClose}>
      <List>
        {routes.map((route) => (
          <List.Item onClick={hisory.push(route.href)} key={route.title}>
            <Link to={route.href}>{route.title}</Link>
          </List.Item>
        ))}
      </List>
    </Drawer>
  );
};

const Links = () => {
  return (
    <Menu
      mode="horizontal"
      selectable={false}
      className="d-flex flex-wrap"
      theme="dark"
    >
      {routes.map(({ href, title, key }) => (
        <Menu.Item>
          <Link href={href} key={key} className="d-none d-lg-block">
            <a className="text-decoration-none text-white ">{title}</a>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  return (
    <Layout.Header className="nav d-flex justify-content-between align-items-center px-4 py-0">
      <div className="py-auto">
        <FaRedhat className="text-white fs-1"/>
        <Typography.Text className="px-2 fs-6 text-white d-none d-lg-inline-block">Travel Buddy</Typography.Text>
      </div>
      <Links  />
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
