import React, { useEffect } from 'react';
import { Cell } from 'zarm';
import useList from '../hooks/list';
import { Link } from '@pickjunk/min';

export default function Home() {
  useEffect(function () {
    console.log('home mounted');
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
        data.push({
          id: offset + i,
          title: `菜单 - ${offset + i + 1}`,
        });
      }
      return {
        data,
        total: 60,
      };
    },
    renderItem(data) {
      return (
        <Link name="sublist" key={data.id}>
          <Cell hasArrow title={data.title} />
        </Link>
      );
    },
  });

  return list.render();
}
