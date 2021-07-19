import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Row, Col, Breadcrumb, Affix } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons';
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
// import ReactMarkdown from 'react-markdown';
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
// import MarkdownNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios';
import Tocify from '../components/tocify.tsx';
import api from '../config/api.js';

export default function Detailed(detail) {
  const renderer = new marked.Renderer()

  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables:  true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(detail.content)

  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header></Header>
      <Breadcrumb className="breadcrumb">
        <BreadcrumbItem><a href="/">首页</a></BreadcrumbItem>
        <BreadcrumbItem><a href={'/list?id=' + detail.typeId}>{detail.typeName}</a></BreadcrumbItem>
        <BreadcrumbItem>{detail.title}</BreadcrumbItem>
      </Breadcrumb>
      <div className="main">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} >
            <div className="left">
              <div className="detail-title">{detail.title}</div>
              <div className="desc center">
                <span><CalendarOutlined />{detail.createTime}</span>
                <span><FolderOpenOutlined />{detail.typeName}</span>
                <span><FireOutlined />{detail.viewCount} 人</span>
              </div>
              <div className="detail-content" dangerouslySetInnerHTML = {{ __html: html }}></div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} xl={6}>
            <div className="right">
              <Affix offsetTop={5}>
                <div className="detail-nav">
                  <div className="nav-title">文章目录</div>
                  <div className="toc-list">
                    {tocify && tocify.render()}
                  </div>
                </div>
              </Affix>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(api.getArticleById + id).then((res) => {
      resolve(res.data.data[0])
    })
  })
  return await promise
}