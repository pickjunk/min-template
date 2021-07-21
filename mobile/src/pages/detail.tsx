import React, { useEffect } from 'react';
import { Button, Cell } from 'zarm';
import { router, useRouter } from '@pickjunk/min';

export default function Back() {
  useEffect(function () {
    console.log('back mounted');
  }, []);

  const {
    location: { args },
    context: { saved },
  } = useRouter();

  return (
    <div>
      <Cell title={`事项 - ${args.id}`}></Cell>
      <Cell>
        <Button
          block
          theme="primary"
          onClick={function () {
            saved();
            router.back();
          }}
        >
          已处理
        </Button>
      </Cell>
      <Cell>
        <Button
          block
          onClick={function () {
            router.back();
          }}
        >
          取消
        </Button>
      </Cell>
    </div>
  );
}
