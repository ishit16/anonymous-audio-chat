import { Card } from "antd";

const UpcomingMeetings = ({
  id,
  Admin,
  startTime,
  endTime,
  invities,
  topic,
  isModalVisible,
  handleCancel,
  handleOk,
  showModal,
  disabledDate,
  disabledTime,
}) => {
  return (
    <span>
      <div>
        <Card
          title={id}
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
          <p>Admin id: {Admin}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
          <p>Attendees: {invities}</p>
          <p>Topic: {topic}</p>
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
                disabledTime={disabledTime}
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
  );
};

export default UpcomingMeetings;
