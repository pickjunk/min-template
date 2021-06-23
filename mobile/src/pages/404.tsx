import React from 'react';
import { Button } from 'zarm';
import { Link } from '@pickjunk/min';
// @ts-ignore
import i404 from '../assets/images/404.svg';

export default function notFound() {
  return (
    <div
      className="center"
      style={{
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <img src={i404} />
      <h3>404</h3>
      <Link name="home">
        <Button theme="primary">返回首页</Button>
      </Link>
    </div>
  );
}
