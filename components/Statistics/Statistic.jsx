import { Row, Col, Divider } from 'antd';
import statistic from './Statistic.module.scss';


export default function Statistic() {
  return (
    <>
      <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
      <h1>Hệ thống vé xe khách và vé xe limousine lớn nhất Việt Nam</h1>
      <Row gutter={{
        xs: 8, sm: 16, md: 24, lg: 32,
      }}
      >
        <Col className={`gutter-row ${statistic.statisticGroup}`} span={6}>
          <div className={statistic.statisticBox}>
            <div className={statistic.statisticIcon} />
            <div className={statistic.statisticDetail}>
              <h3 className={statistic.statisticValue}>5000+</h3>
              <h3 className={statistic.statisticValue}>Tuyến đường</h3>
            </div>
          </div>
        </Col>
        <Col className={`gutter-row ${statistic.statisticGroup}`} span={6}>
          <div className={statistic.statisticBox}>
            <div className={statistic.statisticIcon} />
            <div className={statistic.statisticDetail}>
              <h3 className={statistic.statisticValue}>2000+</h3>
              <h3 className={statistic.statisticValue}>Nhà xe</h3>
            </div>
          </div>
        </Col>
        <Col className={`gutter-row ${statistic.statisticGroup}`} span={6}>
          <div className={statistic.statisticBox}>
            <div className={statistic.statisticIcon} />
            <div className={statistic.statisticDetail}>
              <h3 className={statistic.statisticValue}>5000+</h3>
              <h3 className={statistic.statisticValue}>Đại lý bán vé</h3>
            </div>
          </div>
        </Col>
        <Col className={`gutter-row ${statistic.statisticGroup}`} span={6}>
          <div className={statistic.statisticBox}>
            <div className={statistic.statisticIcon} />
            <div className={statistic.statisticDetail}>
              <h3 className={statistic.statisticValue}>400+</h3>
              <h3 className={statistic.statisticValue}>Bến xe</h3>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
