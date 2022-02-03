import React, { useState } from "react";
import { Layout, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Header, Footer, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 700,
          backgroundColor: "black",
        }}
      >
        <Button
          type="danger"
          style={{
            height: 550,
            width: 500,
            backgroundColor: "grey",
            marginLeft: 100,
            marginRight: 266,
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
        </Button>
        <Button
          type="danger"
          style={{
            height: 550,
            width: 500,
            backgroundColor: "grey",
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
        </Button>
      </Content>

      <Footer>
        <Button
          type="primary"
          style={{
            minHeight: 10,
            width: 100,
            marginLeft: 683,
          }}
        >
          Join Audio
        </Button>

        <Button
          type="danger"
          style={{
            minHeight: 10,
            width: 100,
            backgroundColor: "#FF0000",
            marginLeft: 683,
            marginTop: 20,
          }}
        >
          Leave
        </Button>
      </Footer>
    </Layout>
  );
};

export default Home;
