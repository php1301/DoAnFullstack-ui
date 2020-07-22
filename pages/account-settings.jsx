import { UserAccountSettingsPage } from 'container/User/index';
import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';
import { secretPage } from 'library/helpers/restriction';
import { getDeviceType } from 'library/helpers/get_device_type';

const AccountSettings = (props) => (
  <UserAccountSettingsPage
    {...props}
  />
);

AccountSettings.getInitialProps = async (context) => {
  const { req, query } = context;
  const isLoggedIn = secretPage(context);
  const apiUrl = [
    {
      endpoint: 'user',
      name: 'userProfile',
    },
  ];
  const pageData = await GetAPIData(apiUrl);
  const processedData = ProcessAPIData(pageData);
  const deviceType = getDeviceType(req);
  return {
    processedData, deviceType, isLoggedIn, query,
  };
};
// export async function getServerSideProps() {
//   const apiUrl = [
//     {
//       endpoint: 'user',
//       name: 'userProfile',
//     },
//   ];
//   const pageData = await GetAPIData(apiUrl);
//   const processedData = ProcessAPIData(pageData);
//   return {
//     props: { processedData },
//   };
// }

export default AccountSettings;
