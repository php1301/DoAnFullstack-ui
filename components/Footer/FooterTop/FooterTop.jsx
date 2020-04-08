import React, { useEffect } from 'react';
import { List, Card } from 'antd';
import footerTop from './FooterTop.module.scss';

const data = [
  {
    title: 'Tin tức',
    content: ['Xe giường nằm Limousine – đỉnh cao mới của ngành xe khách', 'Xe limousine đi Vũng Tàu: Tổng hợp top 6 xe chất lượng cao',
      'Review xe limousine đi Đà Lạt: những câu hỏi thường gặp', 'Xe limousine đi Sapa: Tổng hợp top các hãng xe chất lượng cao'],
    hrefLink: ['https://blog.vexere.com/xe-giuong-nam-limousine',
      'https://blog.vexere.com/xe-limousine-di-vung-tau-tong-hop',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/xe-limousine-di-sapa-tong-hop/'],
  },
  {
    title: 'Tuyến đường',
    content: [' Sài Gòn đi Buôn Ma Thuột', 'Sài Gòn đi Vũng Tàu', 'Sài Gòn đi Nha Trang', 'Sài Gòn đi Đà Lạt', 'Hà Nội đi Sa Pa', 'Hà Nội đi Hải Phòng', 'Hà Nội đi Vinh'],
    hrefLink: ['https://blog.vexere.com/xe-giuong-nam-limousine',
      'https://blog.vexere.com/xe-limousine-di-vung-tau-tong-hop',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/xe-limousine-di-sapa-tong-hop/',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat'],
  },
  {
    title: 'Xe Limousine',
    content: ['Limousine Sài Gòn đi Đà Lạt', 'Limousine Hà Nội đi Thanh Hóa', 'Limousine Đà Nẵng đi Đà Lạt', 'Limousine Hà Nội đi Nam Định', 'Limousine Hà Nội đi Vinh',
      'Limousine Hà Nội đi Thái Bình', 'Limousine Buôn Ma Thuột đi Đà Lạt'],
    hrefLink: ['https://blog.vexere.com/xe-giuong-nam-limousine',
      'https://blog.vexere.com/xe-limousine-di-vung-tau-tong-hop',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/xe-limousine-di-sapa-tong-hop/',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat',
      'https://blog.vexere.com/review-xe-limousine-di-da-lat'],
  },
];
const liStyle = { marginTop: '15px' };
const setCol = () => {
  useEffect(() => {
    const text = 'ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-6 ant-col-lg-6 ant-col-xl-12 ant-col-xxl-12';
    const text2 = 'ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-6 ant-col-lg-6 ant-col-xl-6 ant-col-xxl-6';
    const replace = document.getElementsByClassName('ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-6 ant-col-lg-6 ant-col-xl-8 ant-col-xxl-8');
    if (replace != null) {
      replace[0].className = text;
      replace[1].className = text2;
      replace[0].className = text2;
    }
  }, []);
};
export default function FooterTop() {
  setCol();
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 3,
        xxl: 3,
      }}
      style={{
        width: '980px',
        display: 'block',
        margin: 'auto',
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            headStyle={{ padding: '0' }}
            style={{ background: 'none' }}
            title={item.title}
          >
            {item.content.map((e, index) => (

              <li style={liStyle}>
                <a
                  className={footerTop.aTag}
                  href={item.hrefLink[index]}
                >
                  {e}
                </a>
              </li>
            ))}
          </Card>
        </List.Item>
      )}
    />
  );
}
