import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import api from '../config/api.js';
import styles from '../styles/Header.module.css';
import { Row, Col, Menu } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1997343_w2d8d20xgn.js',
});

export default function Header() {
  const [navArr, setNavArr] = useState([])

  useEffect(() => {
    axios(api.getTypeInfo).then((res) => {
      setNavArr(res.data.data)
    })
  }, [])

  const handleClick = (e) => {
    if (e.key === '0') {
      Router.push('/')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className={styles.header}>
      <Row className={styles.content}>
        <Col xs={24} sm={24} md={10} lg={14} xl={14}>
          <span className={styles.logo}>sasa</span>
          <span className={styles.text}>前端开发</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={10} xl={10}>
          <Menu
            className={styles.menu}
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key={0}>
              <IconFont type="icon-home" />
              首页
            </Menu.Item>
            {
              navArr.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <IconFont type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}