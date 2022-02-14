import { Card } from "antd";

const MeetingHistory = ({ id, Admin, startTime, endTime }) => {
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
            backgroundColor: "#D3D3D3",
            border: 100,
            align: "center",
          }}
        >
          <p>Admin id: {Admin}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
        </Card>
        <br></br>
      </div>
    </span>
  );
};

export default MeetingHistory;
