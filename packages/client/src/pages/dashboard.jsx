import {
  Button,
  Layout,
  Breadcrumb,
  Menu,
  Card,
  Tabs,
  Modal,
  DatePicker,
  Space,
} from "antd";
import { useState, useEffect, React } from "react";
import axios from "axios";
import Title from "antd/lib/Typography/Title";
import { useRouter } from "next/router";
import moment from "moment";

const { Header, Footer, Sider, Content } = Layout;

const { RangePicker } = DatePicker;

const { TabPane } = Tabs;

const api = axios.create({
  baseURL: `https://run.mocky.io/v3`,
});

const Demo = () => {
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }

  function disabledRangeTime(_, type) {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const callback = async (key) => {
    if (key == 1) {
      const response = await api.get("/a7e2a5ad-3f8a-4ade-b409-9f8b8fe37cad");
      setMeetings(response.data);
    }
    if (key == 2) {
      const response = await api.get("/58d37e0d-838c-4373-9a7b-19a4bd967a8c");
      setX(response.data);
    }
    console.log(key);
  };
  callback(1);
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const [x, setX] = useState([]);

  const AddMeeting = (id) => {};

  const ScheduleMeetings = async () => {
    try {
      const response = await api.get("/58d37e0d-838c-4373-9a7b-19a4bd967a8c");
      setX(response.data);
    } catch (error) {
      error, console.log(error);
    }

    setIsModalVisible(true);
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
        <Button
          style={{
            float: "right",
          }}
          type="primary"
          onClick={() => router.push("/login")}
        >
          Logout
        </Button>
        <Title style={{ color: "white" }} level={3}>
          Jinay
        </Title>
      </Header>
      <Layout>
        <Sider>
          <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
            <Menu.Item key="Dashboard">Dashboard</Menu.Item>
            {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Meeting History">
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
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Login</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            {/* <div style={{ background: "#fff", padding: 28, minHeight: 580 }}>
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
            </div> */}
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="View Upcoming Meeting" key="1">
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
                        <Button type="primary" onClick={showModal}>
                          Reschedule
                        </Button>
                        <Modal
                          title="Reschedule Meeting"
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <Space direction="vertical" size={12}>
                            <DatePicker
                              format="YYYY-MM-DD HH:mm:ss"
                              disabledDate={disabledDate}
                              disabledTime={disabledDateTime}
                              showTime={{
                                defaultValue: moment("00:00:00", "HH:mm:ss"),
                              }}
                            />
                          </Space>
                        </Modal>
                      </Card>
                      <br></br>
                    </div>
                  </span>
                ))}
              </TabPane>
              <TabPane tab="View Meeting History" key="2">
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
                          backgroundColor: "#D3D3D3",
                          border: 100,
                          align: "center",
                        }}
                      >
                        <p>Admin id: {meeting.Admin}</p>
                        <p>Start Time: {meeting.startTime}</p>
                        <p>End Time: {meeting.endTime}</p>
                      </Card>
                      <br></br>
                    </div>
                  </span>
                ))}
              </TabPane>
            </Tabs>
            <Button type="primary" block onClick={ScheduleMeetings}>
              Schedule New Meeting
            </Button>
            <Modal
              title="Reschedule Meeting"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Space direction="vertical" size={12}>
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{
                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                  }}
                />
              </Space>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Demo;
