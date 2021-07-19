import React, { useState, useEffect } from 'react';
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';
import '../styles/AddArticle.css';
import serviceUrl from '../config/api';
import axios from 'axios';
import { message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('预览内容')
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: serviceUrl.getTypeInfo,
      withCredentials: true
    }).then((res) => {
      if(res.data.data === '没有登录') {
        localStorage.removeItem('openId')
        props.history.push('/')
      } else {
        setTypeInfo(res.data.data)
      }
    })
  }

  useEffect(() => {
    getTypeInfo()
  }, [])

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  })
  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const handleTypeChange = (value) => {
    setTypeInfo(value)
  }

  const saveArticle = () => {
    if(!typeInfo) {
      message.error('请选择文章类别')
      return false
    } else if(!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if(!articleContent) {
      message.error('文章内容不能为空')
      return false
    }
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={[16, 24]}>
            <Col span={16}>
              <Input placeholder="输入文章标题..." size="large" onChange={e => { setArticleTitle(e.target.value) }} />
            </Col>
            <Col span={8}>
              <Select size="large" defaultValue="选择分类" onChange={handleTypeChange}>
                {
                  typeInfo.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.typeName}</Option>
                  })
                }
              </Select>
              <Button size="large">暂存文章</Button>
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html: markdownContent}}></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
