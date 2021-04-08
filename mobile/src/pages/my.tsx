import React from 'react';
import { Button } from 'antd-mobile';
import { router } from '@pickjunk/min';

export default function My() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        type="primary"
        style={{ padding: '0 16px' }}
        onClick={function () {
          router.push({
            name: 'back',
          });
        }}
      >
        点击打开新页面
      </Button>
    </div>
  );
}
