import { observer } from 'mobx-react';
import * as React from 'react';

import { AddTab, StyledTabbar, TabsContainer } from './style';
import { Tabs } from '../Tabs';
import store from '../../../store';
import { icons } from '~/renderer/constants';
import HorizontalScrollbar from '~/renderer/components/HorizontalScrollbar';

const getContainer = () => store.tabs.containerRef.current;

const onMouseEnter = () => (store.tabs.scrollbarVisible = true);

const onMouseLeave = () => (store.tabs.scrollbarVisible = false);

const onAddTabClick = () => {
  store.tabs.onNewTab();
};

export const Tabbar = observer(() => {
  const visible =
    store.tabGroups.currentGroup.tabs.length === 0 ||
    store.overlay.currentContent !== 'default';

  return (
    <StyledTabbar
      style={{
        opacity: store.tabbarVisible ? 1 : 0,
        pointerEvents: store.tabbarVisible ? 'auto' : 'none',
      }}
    >
      <TabsContainer
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={store.tabs.containerRef}
      >
        <Tabs />
      </TabsContainer>
      <AddTab
        disabled={visible}
        icon={icons.add}
        onClick={onAddTabClick}
        divRef={(r: any) => (store.addTab.ref = r)}
      />
      <HorizontalScrollbar
        ref={store.tabs.scrollbarRef}
        enabled={store.tabs.scrollable}
        visible={store.tabs.scrollbarVisible}
        getContainer={getContainer}
      />
    </StyledTabbar>
  );
});
