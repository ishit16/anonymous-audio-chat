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
import MeetingHistory from "../components/MeetingHistory";

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
      setLoading(true);
      const response = await api.get("/a7e2a5ad-3f8a-4ade-b409-9f8b8fe37cad");
      console.log(
        "This is the type of response.data=",
        Array.isArray(response.data),
        response.data
      );

      setMeetings(response.data);
      setLoading(false);
    }
    if (key == 2) {
      const response = await api.get("/58d37e0d-838c-4373-9a7b-19a4bd967a8c");
      setX(response.data);
    }
    console.log(key);
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    //callback(1);
  }, []);
  if (loading == true) {
    return null;
  }

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
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Login</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="View Upcoming Meeting" key="1">
                {console.log(meetings)}
                {meetings.map((meeting) => (
                  <UpcomingMeetings
                    key={meeting.id}
                    id={meeting.id}
                    Admin={meeting.Admin}
                    startTime={meeting.startTime}
                    endTime={meeting.endTime}
                    invities={meeting.invities}
                    topic={meeting.topic}
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    showModal={showModal}
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                  />
                  // <span key={meeting.id}>
                  //   <div className="site-card-border-less-wrapper">
                  //     <Card
                  //       title={meeting.id}
                  //       bordered={true}
                  //       style={{
                  //         width: 300,
                  //         textAlign: "center",
                  //         alignSelf: "center",
                  //         padding: 30,
                  //         backgroundColor: "#add8e6",
                  //         border: 100,
                  //         align: "center",
                  //       }}
                  //     >
                  //       <p>Admin id: {meeting.Admin}</p>
                  //       <p>Start Time: {meeting.startTime}</p>
                  //       <p>End Time: {meeting.endTime}</p>
                  //       <p>Attendees: {meeting.invities}</p>
                  //       <p>Topic: {meeting.topic}</p>
                  //       <Button type="primary" onClick={showModal}>
                  //         Reschedule
                  //       </Button>
                  //       <Modal
                  //         title="Reschedule Meeting"
                  //         visible={isModalVisible}
                  //         onOk={handleOk}
                  //         onCancel={handleCancel}
                  //       >
                  //         <Space direction="vertical" size={12}>
                  //           <DatePicker
                  //             format="YYYY-MM-DD HH:mm:ss"
                  //             disabledDate={disabledDate}
                  //             disabledTime={disabledDateTime}
                  //             showTime={{
                  //               defaultValue: moment("00:00:00", "HH:mm:ss"),
                  //             }}
                  //           />
                  //         </Space>
                  //       </Modal>
                  //     </Card>
                  //     <br></br>
                  //   </div>
                  // </span>
                ))}
              </TabPane>
              <TabPane tab="View Meeting History" key="2">
                {x.map((meeting) => (
                  <MeetingHistory
                    key={meeting.id}
                    id={meeting.id}
                    Admin={meeting.Admin}
                    startTime={meeting.startTime}
                    endTime={meeting.endTime}
                  />
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
