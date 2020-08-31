import Head from 'next/head';
import Router from 'next/router';
import { UserDetailsPage } from 'container/User/index';
// import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';
import { secretPage } from 'library/helpers/restriction';
import { getDeviceType } from 'library/helpers/get_device_type';

const Profile = ({ processedData, ...props }) => {
  if (typeof window !== 'undefined') { if (props.query.u) Router.replace('/profile'); }
  return (
    <>
      <Head>
        <title>Profile | Profile Page</title>
      </Head>
      <UserDetailsPage
    // processedData={processedData.data}
        {...props}
      />
    </>
  );
};

Profile.getInitialProps = async (context) => {
  const { query, req } = context;
  const isLoggedIn = secretPage(context);
  // const apiUrl = [
  //   {
  //     endpoint: 'user',
  //     name: 'listingUser',
  //   },
  // ];
  // const { data, loading, error } = useQuery(GET_PROFILE_OF_CURRENT_USER,{})

  // const pageData = await GetAPIData(apiUrl); // getApiData(data)
  // const processedData = ProcessAPIData(pageData);
  const deviceType = getDeviceType(req);

  return {
    query, isLoggedIn, deviceType,
  };
};

export default Profile;
