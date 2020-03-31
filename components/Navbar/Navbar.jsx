import { Layout, Menu } from 'antd';
import nav from './Navbar.module.scss';

const { Header } = Layout;

export default function Navbar() {
  return (
    <Layout className="layout">
      <Header style={{ background: 'white' }}>
        <div className={nav.navWrapper}>
          <div className="ant-row">
            <div className={`${nav.logo} ant-col ant-col-md-4`}>
              <img href="/" src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg" alt="logo vexere" />
            </div>
            <div className="ant-col ant-col-md-20">
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </Header>
    </Layout>
  );
}
