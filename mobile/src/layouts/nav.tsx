import React, { useState, useEffect } from 'react';
import { Icon, TabBar } from 'antd-mobile';
import { router, useRouter, RouteLocation } from '@pickjunk/min';
import './nav.less';

interface NavItem extends RouteLocation {
  icon?: React.ReactElement;
  title: string;

  active?: boolean;
}

const items: NavItem[] = [
  {
    icon: <i className="iconfont icon-shouye" />,
    title: '首页',
    name: 'home',
  },
  {
    icon: <i className="iconfont icon-my" />,
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
      <TabBar>
        {items.map(({ name, icon, title }) => {
          return (
            <TabBar.Item
              key={name}
              icon={icon}
              selectedIcon={icon}
              title={title}
              selected={name == location.name}
              onPress={function () {
                router.replace({
                  name,
                });
              }}
            ></TabBar.Item>
          );
        })}
      </TabBar>
    )
  );
}

export function Loading({ children }: { children: React.ReactElement }) {
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
      <Icon type="loading" size="lg" />
    </div>
  ) : (
    children
  );
}

export default function Nav({ children }: { children: React.ReactNode }) {
  const { location } = useRouter();

  return (
    <Loading>
      <div id="basic">
        <TabBar>
          {items.map(({ name, icon, title }) => {
            return (
              <TabBar.Item
                key={name}
                icon={icon}
                selectedIcon={icon}
                title={title}
                selected={name == location.name}
                onPress={function () {
                  if (name == location.name) {
                    return;
                  }

                  router.replace({
                    name,
                  });
                }}
              >
                {children}
              </TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    </Loading>
  );
}
