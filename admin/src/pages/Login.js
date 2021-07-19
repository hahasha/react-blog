import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../styles/Login.css';
import { Button, Card, Input, message, Spin } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/api'
// import { useHistory } from 'react-router-dom';

export default function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    if(userName === '') {
      message.error('用户名不能为空！')
      return false
    } else if(password === '') {
      message.error('密码不能为空！')
      return false
    }
    setIsLoading(true)
    axios({
      method: 'post',
      url: servicePath.login,
      data: {
        userName: userName,
        password: password
      },
      withCredentials: true
    }).then((res) => {
      setIsLoading(false)
      if(res.data.data === '登录成功') {
        localStorage.setItem('openId', res.data.openId)
        props.history.push('/index')
      } else {
        message.error('用户名密码错误')
      }
    })
  }

  return (
    <div className="login">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="博客后台管理系统" bordered={false} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="请输入用户名"
            prefix={<UserOutlined />}
            onChange={(e) => { setUserName(e.target.value) }}
          ></Input>
          <Input.Password
            id="password"
            size="large"
            placeholder="请输入密码"
            prefix={<KeyOutlined />}
            onChange={(e) => { setPassword(e.target.value) }}
          ></Input.Password>
          <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
        </Card>
      </Spin>
    </div>
  )
}
