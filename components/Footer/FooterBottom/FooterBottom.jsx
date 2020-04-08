import { List, Card } from 'antd';
import footerBottom from './FooterBottom.module.scss';

const ImgCert1 = () => (<img alt="Vexere - Certificate" src="https://storage.googleapis.com/fe-production/images/Home/certificate0.png" />);
const ImgCert2 = () => (<img alt="Vexere - Certificate" src="https://storage.googleapis.com/fe-production/images/Home/certificate3.png" />);
const Download1 = () => (<img style={{ maxWidth: '150px' }} alt="download-logo-1" src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2" />);
const Download2 = () => (<img style={{ maxWidth: '150px ' }} alt="download-logo-2" src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2" />);
const data = [
  {
    title: 'Về chúng tôi',
    content: ['Giới Thiệu VeXeRe.com', 'Tuyển dụng', 'Tin tức', 'Liên Hệ', 'Chắp cánh ước mơ'],
    hrefLink: ['https://vexere.com/vi-VN/gioi-thieu.html',
      'https://vexere.com/vi-VN/tuyen-dung',
      'https://vexere.com/vi-VN/tin-tuc',
      'https://vexere.com/vi-VN/lien-he.html',
      'https://vexere.com/vi-VN/ve-xe-gia-re-ho-tro-tan-sinh-vien-nhap-hoc',
    ],
  },
  {
    title: 'Hỗ trợ',
    content: ['Hướng dẫn thanh toán', 'Quy chế VeXeRe.com', 'Câu hỏi thường gặp', 'Phần mềm hãng xe'],
    hrefLink: ['https://vexere.com/vi-VN/huong-dan-thanh-toan-tren-website.html',
      'https://vexere.com/vi-VN/quy-che.html',
      'https://vexere.com/vi-VN/nhung-cau-hoi-thuong-gap.html',
      'https://vexere.com/vi-VN/phan-mem-quan-ly-ban-ve-xe-khach-vexere.html',
    ],
  },
  {
    title: 'Chứng nhận',
    content: [<ImgCert1 />, <ImgCert2 />],
    hrefLink: ['',
      'http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=773',
    ],
  },
  {
    title: 'Tải ứng dụng VeXeRe',
    content: [<Download1 />, <Download2 />],
    hrefLink: ['https://itunes.apple.com/vn/app/vexere/id1183279479',
      'https://play.google.com/store/apps/details?id=com.vexere.vexere',
    ],
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
          sm: 2,
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
                    className={footerBottom.aTag}
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

    </>
  );
}
