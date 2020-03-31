import React from 'react';
import { Layout } from 'antd';
import cover from './Cover.module.scss';

const { Content } = Layout;

export default function Cover() {
  return (
    <Content>
      <div className={cover.siteLayoutContent}>
        <img className={cover.coverImage} src="https:////static.vexere.com/production/banners/330/neu-ban-phai-di.png" alt="cover" />
      </div>
    </Content>
  );
}
