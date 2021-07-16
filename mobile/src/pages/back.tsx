import React, { useEffect } from 'react';
import { Button } from 'zarm';
import { router } from '@pickjunk/min';

export default function Back() {
  useEffect(function () {
    console.log('back mounted');
  }, []);

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
        theme="primary"
        style={{ padding: '0 16px' }}
        onClick={function () {
          router.back();
        }}
      >
        返回
      </Button>
    </div>
  );
}
