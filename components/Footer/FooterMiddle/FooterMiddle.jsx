import { List, Card } from 'antd';
import footerMiddle from './FooterMiddle.module.scss';

const data = [
  {
    title: 'Bến xe',
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
    title: 'Nhà xe',
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
    title: ' ',
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
    title: ' ',
    content: [' Sài Gòn đi Buôn Ma Thuột', 'Sài Gòn đi Vũng Tàu', 'Sài Gòn đi Nha Trang', 'Sài Gòn đi Đà Lạt', 'Hà Nội đi Sa Pa', 'Hà Nội đi Hải Phòng', 'Hà Nội đi Vinh'],
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
export default function FooterMiddle() {
  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 4,
          lg: 4,
          xl: 4,
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
                    className={footerMiddle.aTag}
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
      <hr style={{
        opacity: '0.3',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(192, 192, 192)',
        borderImage: 'initial',
        margin: '0px',
      }}
      />
    </>
  );
}
