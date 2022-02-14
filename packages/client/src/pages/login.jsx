import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
// import { values } from "core-js/core/array";

const Demo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onFinish = async () => {
    // console.log("Success:", values);
    // let roomID = uuidv4();
    // console.log(roomID, "roomID");
    // delete values["remember"];

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

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        JSON.stringify({
          email: email,
          password,
        }),
        {
          withCredentials: true,
          headers: { "content-type": "application/json" },
        }
      );

      await router.push("/");
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
        label="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
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
