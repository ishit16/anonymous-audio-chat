import { AutoComplete, Button } from "antd";
import styled from "styled-components";
import { Layout, Breadcrumb } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import Title from "antd/lib/Typography/Title";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useRouter } from "next/router";
import axios from "axios";
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "antd";

const api = axios.create({
  baseURL: `https://run.mocky.io/v3`,
});

const Demo = () => {
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const [x, setX] = useState([]);

  const AddMeeting = (id) => {};

  const ScheduleMeetings = async () => {
    try {
      const response = await api.get("/58d37e0d-838c-4373-9a7b-19a4bd967a8c");
      setX(response.data);
    } catch {
      error, console.log(error);
    }
  };

  const UpcomingMeetings = async () => {
    const response = await api.get("/a7e2a5ad-3f8a-4ade-b409-9f8b8fe37cad");
    setMeetings(response.data);
  };
  useEffect(() => {
    console.log(meetings), console.log(x);
  }, [x]);
  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        <Avatar style={{ float: "right" }} icon={<UserOutlined />} />
        <Title style={{ color: "white" }} level={3}>
          Jinay
        </Title>
      </Header>
      <Layout>
        <Sider>
          <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
            <Menu.Item key="Dashboard">Dashboard</Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Meeting History">
              <Menu.ItemGroup key="AboutUS" title="History">
                <Menu.Item key="meeting1"> Meeting 1</Menu.Item>
                <Menu.Item key="meeting2"> Meeting 2</Menu.Item>
                <Menu.Item key="meeting3">
                  {meetings.map((meeting) => (
                    <span key={meeting.id}>
                      Admin id: {meeting.Admin}
                      <br></br>
                    </span>
                  ))}
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Login</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 28, minHeight: 580 }}>
              <Button type="primary" block onClick={ScheduleMeetings}>
                Schedule New Meeting
              </Button>
              {x.map((meeting) => (
                <span key={meeting.id}>
                  <div className="site-card-border-less-wrapper">
                    <Card
                      title={meeting.id}
                      bordered={true}
                      style={{
                        width: 300,
                        textAlign: "center",
                        alignSelf: "center",
                        padding: 30,
                        backgroundColor: "#add8e6",
                        border: 100,
                        align: "center",
                      }}
                    >
                      <p>Admin id: {meeting.Admin}</p>
                      <p>Start Time: {meeting.startTime}</p>
                      <p>End Time: {meeting.endTime}</p>
                      <Button
                        type="primary"
                        block
                        onClick={() => AddMeeting(meeting.id)}
                      >
                        Schedule
                      </Button>
                    </Card>
                    <br></br>
                  </div>
                </span>
              ))}
              <Button block onClick={UpcomingMeetings}>
                View Upcoming Meetings
              </Button>
              {meetings.map((meeting) => (
                <span key={meeting.id}>
                  <div className="site-card-border-less-wrapper">
                    <Card
                      title={meeting.id}
                      bordered={true}
                      style={{
                        width: 300,
                        textAlign: "center",
                        alignSelf: "center",
                        padding: 30,
                        backgroundColor: "#add8e6",
                        border: 100,
                        align: "center",
                      }}
                    >
                      <p>Admin id: {meeting.Admin}</p>
                      <p>Start Time: {meeting.startTime}</p>
                      <p>End Time: {meeting.endTime}</p>
                      <p>Attendees: {meeting.invities}</p>
                      <p>Topic: {meeting.topic}</p>
                      <Button
                        type="primary"
                        danger
                        block
                        onClick={() => AddMeeting(meeting.id)}
                      >
                        Delete
                      </Button>
                    </Card>
                    <br></br>
                  </div>
                </span>
              ))}

              <Button type="link" block onClick={() => router.push("/login")}>
                Go Back to the Sign in page
              </Button>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Demo;
