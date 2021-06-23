import React from 'react';
import { Cell } from 'zarm';
import useList from '../hooks/list';
import { Link } from '@pickjunk/min';

export default function Home() {
  const list = useList({
    async load(page) {
      const offset = (page - 1) * 20;
      console.log({
        page,
        offset,
      });

      await new Promise(function (r) {
        setTimeout(r, 2000);
      });

      const data = [];
      for (let i = 0; i < 20; i++) {
        data.push({
          id: offset + i,
          title: `项目 - ${offset + i + 1}`,
          desc: '描述',
        });
      }
      return {
        data,
        total: 60,
      };
    },
    item(data) {
      return (
        <Link name="back" key={data.id}>
          <Cell hasArrow title={data.title} description={data.desc} />
        </Link>
      );
    },
  });

  return list;
}
