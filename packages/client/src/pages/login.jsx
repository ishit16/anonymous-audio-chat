import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect } from "react";

const Demo = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // let roomID = uuidv4();
    // console.log(roomID, "roomID");
    delete values["remember"];
    // const formData = new FormData();
    // formData.append("name", "Rishikesh");
    // console.log(
    //   JSON.stringify({
    //     values,
    //   })
    // );

    // router.push("/discuss/" + roomID);

    // axios.post(`http://localhost:8000/auth/register`, values).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });

    try {
      // make axios post request

      // console.log("values", values);

      const response = await axios({
        method: "post",
        url: "http://localhost:8000/auth/register",
        headers: { "content-type": "application/json" },
        data: values,
      });
      console.log(response, response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// ReactDOM.render(<Demo />, mountNode);
export default Demo;
