import React from 'react';
import { Panel, Cell } from 'zarm';
// @ts-ignore
import avatar from '../assets/images/avatar.png';
import './my.less';

export default function My() {
  return (
    <div id="my">
      <Panel className="header">
        <div className="header-body">
          <img src={avatar} />
          <div>
            <div className="name">蔡俊杰</div>
            <div className="desc">企者不立，跨者不行</div>
          </div>
        </div>
      </Panel>
      <Cell title="菜单项一" />
      <Cell title="菜单项二" />
    </div>
  );
}
