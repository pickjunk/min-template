import React, { useEffect } from 'react';
import { Cell } from 'zarm';
import useList from '../hooks/list';
import { Link } from '@pickjunk/min';

export default function Home() {
  useEffect(function () {
    console.log('sublist mounted');
  }, []);

  const list = useList({
    async loadList(page) {
      const offset = (page - 1) * 20;
      console.log({
        page,
        offset,
      });

      await new Promise(function (r) {
        setTimeout(r, 1000);
      });

      const data = [];
      for (let i = 0; i < 20; i++) {
        const id = offset + i;
        data.push({
          id,
          title: `事项 - ${id + 1}`,
          desc: <p style={{ color: 'red' }}>未处理</p>,
        });
      }
      return {
        data,
        total: 60,
      };
    },
    async loadItem(item) {
      await new Promise(function (r) {
        setTimeout(r, 500);
      });
      item.desc = <p style={{ color: 'green' }}>已处理</p>;
      return item;
    },
    renderItem(data, i) {
      return (
        <Link
          name="detail"
          key={data.id}
          args={{ id: data.id }}
          context={{
            saved() {
              list.refreshItem(i);
            },
          }}
        >
          <Cell hasArrow title={data.title} description={data.desc} />
        </Link>
      );
    },
  });

  return list.render();
}
