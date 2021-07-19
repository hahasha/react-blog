import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../config/api.js';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Author from '../components/Author';
import Footer from '../components/Footer';
import { Row, Col, List, Breadcrumb } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';

export default function TypeList(data) {
  const [ list, setList ] = useState(data.list)

  useEffect(() => {
    setList(data.list)
  })

  return (
    <>
      <Head>
        <title>TypeList</title>
      </Head>
      <Header></Header>
      <Breadcrumb className="breadcrumb">
        <BreadcrumbItem><a href="/">首页</a></BreadcrumbItem>
        <BreadcrumbItem>{ data.id === '1' ? '视频教程' : '快乐生活'}</BreadcrumbItem>
      </Breadcrumb>
      <Row className="main">
        <Col className="left" xs={24} sm={24} md={18} lg={18} xl={18} >
          <div>
            <List
              itemLayout="vertical"
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      {item.title}
                    </Link>
                  </div>
                  <div className="list-icons">
                    <span><CalendarOutlined />{item.createTime}</span>
                    <span><FolderOpenOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.viewCount} 人</span>
                  </div>
                  <div className="list-content">{item.introduce}</div>
                </List.Item>
              )}
            ></List>
          </div>
        </Col>
        <Col className="right" xs={0} sm={0} md={5} lg={5} xl={5}>
          <div>
            <Author></Author>
          </div>
        </Col>
      </Row>
      <Footer></Footer>
    </>
  )
}

TypeList.getInitialProps = async (context) => {
  const id = context.query.id
  const list = await axios(api.getListById + id)
  return {
    list: list.data.data,
    id
  }
}