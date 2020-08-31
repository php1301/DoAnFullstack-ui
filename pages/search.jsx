import Head from 'next/head';
import Router from 'next/router';
import Input from 'components/UI/Antd/Input/Input';
import { SearchOutlined } from '@ant-design/icons';
import Heading from 'components/UI/Heading/Heading';

const { Search } = Input;
const handleSearch = (e) => {
  Router.push('/invoices/[...txid]', `/invoices/${e}`);
};
const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchTXID = ({ query }) => (
  <div style={{ margin: '50px' }}>
    <Head>
      <title> Search TXID </title>
    </Head>
    <Heading as="h3" content="For testing purpose và limit lại email sending (và in case hết free tier) thì sẽ truyền thẳng secretKey cho nhanh, thực tế phải check mail" />
    <Search
      placeholder="Enter TXID Secret Key to Track your Transaction - Find Secret Key on your billing email"
      enterButton="Search"
      size="middle"
      defaultValue={query.secretKey}
      suffix={suffix}
      onSearch={(e) => { handleSearch(e); }}
      onPressEnter={(e) => { handleSearch(e.target.value); }}
    />
  </div>
);

SearchTXID.getInitialProps = async ({ query }) => ({ query });
export default SearchTXID;
