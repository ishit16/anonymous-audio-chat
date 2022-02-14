import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

// const preventDefault = (f) => (e: SyntheticEvent) => {
//   console.log(e);
//   e.preventDefault();
//   f(e);
// };

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  let roomID = uuidv4();

  // if (session) {
  //   // return (
  //   //   <div className="{styles.container}">
  //   //     Welcome user
  //   //     <br />
  //   //     <button onClick={() => signOut()}>Sign out</button>
  //   //   </div>
  //   // );
  //   router.push("/discuss/" + roomID);
  // }
  if (status == "loading") {
    return <h1>Loading.....</h1>;
  }
  const onFinish = async (values) => {
    // event.preventDefault();
    // console.log("Success:", values);
    // let roomID = uuidv4();
    // console.log(roomID, "roomID");

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
      setLoading(true);
      console.log(values);
      // make axios post request

      // console.log("values", values);

      const response = await axios({
        method: "post",
        url: "http://localhost:8000/auth/register",
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      console.log(response, response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        label="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="name"
        onChange={(e) => setUsername(e.target.value)}
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: "http://localhost:3000/discuss/" + roomID,
            })
          }
          type="text"
        >
          Signin via gooogle
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default Register;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: lightblue;
  border-radius: 1 rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
`;
