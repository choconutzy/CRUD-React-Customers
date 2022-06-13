import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import {useNavigate} from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
  const onFinish = (values) => {
    const {email, password} = values
                axios.post(`${process.env.REACT_APP_URL}/auth/login`,
                    {email:email, password:password},
                    {headers: { 'Content-Type': 'application/json',
                  }})
          .then(response => {
          if(response.data.access_token){
            localStorage.setItem("Authorization", `${response.data.access_token}`)
            alert("Welcome")
            navigate("/dashboard")
          }
          })
          .catch(error => {
            console.log(error.data)
          })
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
        <div className='login-container'>
            <div className='login-form'>
                <h1>Login</h1>
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
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    </>
  );
};

export default Login;