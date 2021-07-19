import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Author from '../components/Author';
import Footer from '../components/Footer';
import { Row, Col, List } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../config/api.js';

export default function Home(articleList) {
  const [ list, setList ] = useState(articleList.data)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header></Header>
      <div className="main">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} >
            <div className="left">
              <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={list}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icons">
                      <span><CalendarOutlined />{item.createTime}</span>
                      <span><FolderOpenOutlined />{item.typeName}</span>
                      <span><FireOutlined />{item.viewCount}</span>
                    </div>
                    <div className="list-content">{item.introduce}</div>
                  </List.Item>
                )}
              ></List>
            </div>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} xl={6}>
            <div className="right" >
              <Author></Author>
            </div>
          </Col>
        </Row>
      </div>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(api.getArticleList).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}