import React, { useState, useEffect } from 'react';
import { TabBar, ActivityIndicator } from 'zarm';
import { router, useRouter, RouteLocation } from '@pickjunk/min';
import Icon from '../assets/icon';
import './nav.less';

interface NavItem extends RouteLocation {
  icon?: React.ReactElement;
  title: string;

  active?: boolean;
}

const items: NavItem[] = [
  {
    icon: <Icon type="icon-shouye" />,
    title: '首页',
    name: 'home',
  },
  {
    icon: <Icon type="icon-my" />,
    title: '我的',
    name: 'my',
  },
];

function NavBar() {
  const { location } = useRouter();

  let show = false;
  for (let item of items) {
    if (item.name == location.name) {
      show = true;
    }
  }

  return (
    show && (
      <TabBar
        activeKey={location.name}
        onChange={function (name) {
          router.replace({
            name: name as string,
          });
        }}
      >
        {items.map(({ name, icon, title }) => {
          return (
            <TabBar.Item
              key={name}
              itemKey={name}
              icon={icon}
              title={title}
            ></TabBar.Item>
          );
        })}
      </TabBar>
    )
  );
}

export function AppLoading({ children }: { children: React.ReactElement }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return function () {
      clearTimeout(h);
    };
  }, []);

  return loading ? (
    <div id="loading">
      <ActivityIndicator size="lg" />
    </div>
  ) : (
    children
  );
}

export default function Nav({ children }: { children: React.ReactNode }) {
  return (
    <AppLoading>
      <div id="nav">
        <div className="content">{children}</div>
        <NavBar />
      </div>
    </AppLoading>
  );
}
