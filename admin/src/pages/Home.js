import { Menu, Breadcrumb } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { DashboardOutlined, CopyOutlined, MessageOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SubMenu from 'antd/lib/menu/SubMenu';
import Sider from 'antd/lib/layout/Sider';
import '../styles/Home.css';
import { Route } from 'react-router-dom';
import AddArticle from './AddArticle';

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo">
          <span>blog</span>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <span>工作台</span>
          </Menu.Item>
          <SubMenu key="sub1" icon={<CopyOutlined />} title="文章管理">
            <Menu.Item key="2">
              <span>文章列表</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>添加文章</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<MessageOutlined />}>
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <span>个人中心</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
            <span
              className="trigger"
              onClick={() => { setCollapsed(!collapsed) }}
            >
              { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            </span>
        </Header>
        <Content>
          <Breadcrumb style={{ padding: "10px 24px" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
            <div>
              <Route path="/index" component={AddArticle}></Route>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}