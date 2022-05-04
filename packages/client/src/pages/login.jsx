import { Form, Input, Button, Checkbox } from 'antd'
import { useRouter } from 'next/router'
import { getProviders, signIn, getSession, csrfToken } from "next-auth/react";

export default function Demo({ providers }) {
  const router = useRouter()
  console.log(providers)

  const onFinish = (values) => {
    console.log('Success:', values)
    let r = (Math.random() + 1).toString(36).substring(2)
    console.log('random', r)

    router.push('/')
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
        <Form
          className="pt-8 px-8 bg-slate-50 shadow-md rounded-md"
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
            className=""
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Submit
            </button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {Object.values(providers).map((provider)=>{
              return(
                <div key={provider.name}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
             onClick={() => signIn(provider.id)}>
              Login With {provider.name}
            </button>
                </div>
              );
            })}
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(context),
    },
  };
}
