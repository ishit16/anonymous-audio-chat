import { Form, Input, Button, Checkbox } from 'antd'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { useState } from 'react'

const Demo = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    // console.log(
    //   "Success:",
    //   values,
    //   values["password"],
    //   values["Confirm password"]
    // );
    try {
      // make axios post request
      setLoading(true)
      const response = await axios({
        method: 'post',
        url: 'https://httpstat.us/200?sleep=5000',
        data: values,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

    if (values['password'] == values['Confirm password']) {
      router.push('/login')
    } else {
      alert("Password doesn't match")
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <div className="w-screen py-2 shadow-md flex justify-center items-center box-border fixed bg-zinc-100">
        <p className="text-3xl font-bold underline">WeLive</p>
      </div>
      <div className="flex justify-center items-center h-screen">
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
                message: 'Please input your username!',
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
                message: 'Please input your password!',
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
                message: 'Confirm your password!',
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
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
              Submit
            </button>
          </Form.Item>
        </StyledForm>
      </div>
    </>
  )
}

export default Demo

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 50%);
`
