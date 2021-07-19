import { Avatar, Divider, Tag } from 'antd';
import styles from '../styles/Author.module.css';
import { UserOutlined, GithubOutlined, TwitterOutlined, WeiboCircleOutlined, WechatOutlined } from '@ant-design/icons';

export default function Author() {
  return (
    <div className={styles.author}>
      <div>
        <Avatar size={80} icon={<UserOutlined />}></Avatar>
        <p className={styles.text}>爱学习，爱生活</p>
      </div>
      <div className={styles.introduction}>
        <div className={styles.tags}>
          <Tag color="magenta">3年经验</Tag>
          <Tag color="red">Vue 全家桶</Tag>
          <Tag color="purple">可视化</Tag>
          <Tag color="lime">React 全家桶</Tag>
          <Tag color="blue">前端工程化</Tag>
        </div>
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className={styles.account}></Avatar>
        <Avatar size={28} icon={<TwitterOutlined />} className={styles.account}></Avatar>
        <Avatar size={28} icon={<WeiboCircleOutlined />} className={styles.account}></Avatar>
        <Avatar size={28} icon={<WechatOutlined />} className={styles.account}></Avatar>
      </div>
    </div>
  )
}