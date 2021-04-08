import React from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Link } from '@pickjunk/min';
// @ts-ignore
import i404 from '../assets/images/404.svg';

export default function notFound() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img src={i404} />
      <WhiteSpace />
      <h3>404</h3>
      <WhiteSpace />
      <Button type="primary">
        <Link name="home">返回首页</Link>
      </Button>
    </div>
  );
}
