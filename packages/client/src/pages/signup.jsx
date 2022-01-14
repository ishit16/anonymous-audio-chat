import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const Demo = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (session) {
    // return (
    //   <div className="{styles.container}">
    //     Welcome user
    //     <br />
    //     <button onClick={() => signOut()}>Sign out</button>
    //   </div>
    // );

    let roomID = uuidv4();
    console.log(roomID, "roomID");

    router.push("/discuss/" + roomID);
  }

  const onFinish = async (values) => {
    try {
      // make axios post request
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "https://httpstat.us/200?sleep=5000",
        data: values,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (values["password"] == values["Confirm password"]) {
      router.push("/login");
    } else {
      alert("Password doesn't match");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledForm
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
        name="username"
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
        label="Confirm Password"
        name="Confirm password"
        rules={[
          {
            required: true,
            message: "Confirm your password!",
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button onClick={() => signIn("google")} type="text">
          Signin via gooogle
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default Demo;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: green;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
`;
