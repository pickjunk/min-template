import { log } from '@pickjunk/min';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pull } from 'zarm';
import useForceUpdate from 'use-force-update';
import './list.less';

const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

export default function useList({
  loadList,
  loadItem,
  renderItem,
  autoLoad = true,
}: {
  loadList: (page: number) => Promise<{
    data: any[];
    total: number;
  }>;
  loadItem?: (item: any) => Promise<any>;
  renderItem(data: any, index: number): React.ReactNode;
  autoLoad?: boolean;
}) {
  const state = useRef({
    data: [] as any[],
    page: 0,
  });
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const forceUpdate = useForceUpdate();

  const s = state.current;

  async function loadData() {
    setLoading(LOAD_STATE.loading);
    try {
      const r = await loadList(s.page + 1);
      s.data.push(...r.data);
      s.page++;
      if (s.data.length >= r.total) {
        setLoading(LOAD_STATE.complete);
      } else {
        setLoading(LOAD_STATE.normal);
      }
    } catch (e) {
      log.error(e);
      setLoading(LOAD_STATE.normal);
    }
  }
  async function refreshList() {
    setRefreshing(REFRESH_STATE.loading);
    try {
      const r = await loadList(1);
      s.data = r.data;
      s.page = 1;
    } catch (e) {
      log.error(e);
    }
    setRefreshing(REFRESH_STATE.normal);
  }
  async function refreshItem(i: number) {
    s.data[i] = await loadItem(s.data[i]);
    forceUpdate();
  }

  if (autoLoad) {
    useEffect(function () {
      refreshList();
    }, []);
  }

  return {
    render() {
      return (
        <Pull
          refresh={{
            state: refreshing,
            handler: refreshList,
            render(state: number, percent: number) {
              switch (state) {
                case REFRESH_STATE.pull:
                  return (
                    <div className="indicator">
                      <ActivityIndicator loading={false} percent={percent} />
                      <span>下拉刷新</span>
                    </div>
                  );
                case REFRESH_STATE.drop:
                  return (
                    <div className="indicator">
                      <ActivityIndicator loading={false} percent={100} />
                      <span>松开立即刷新</span>
                    </div>
                  );
                case REFRESH_STATE.loading:
                  return (
                    <div className="indicator">
                      <ActivityIndicator />
                      <span>加载中</span>
                    </div>
                  );
              }
            },
          }}
          load={{
            state: loading,
            handler: loadData,
            distance: 200,
            render(state: number) {
              switch (state) {
                case LOAD_STATE.loading:
                  return (
                    <div className="indicator">
                      <ActivityIndicator />
                      <span>加载中</span>
                    </div>
                  );
                case LOAD_STATE.complete:
                  return <div className="indicator">-- 到此为止，告辞 --</div>;
              }
            },
          }}
        >
          {s.data.map(renderItem)}
        </Pull>
      );
    },
    load: refreshList,
    refreshList,
    refreshItem: loadItem ? refreshItem : undefined,
  };
}
