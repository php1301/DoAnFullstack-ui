import { Card, Col, Row } from 'antd';
import React from 'react';
import special from './Special.module.scss';

export default function Special() {
  return (
    <div className={special.siteCardWrapper}>
      <Row gutter={16}>
        <Col span={8}>
          <Card className={special.customTitle} title={<span style={{ color: 'red' }}>Title</span>} bordered={false}>
            <img className={special.specialCard} src="https://static.vexere.com/production/banners/330/banner-home.png" alt="hp1" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <img className={special.specialCard} src="https://static.vexere.com/production/banners/330/banner-trang-chu-ok.png" alt="hp1" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            <img className={special.specialCard} src="https://static.vexere.com/production/banners/330/banner-trang-chu-(1).png" alt="hp1" />
          </Card>
        </Col>
      </Row>
    </div>

  );
}
