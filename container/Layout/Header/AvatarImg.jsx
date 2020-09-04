import { useQuery } from 'react-apollo';
import Logo from 'components/UI/Logo/Logo';
import { GET_USER_INFO } from 'apollo-graphql/query/query';

const AvatarImg = ({ user }) => {
  const {
    loading,
    data,
  } = useQuery(GET_USER_INFO, {
    variables: {
      id: user.id,
    },
  });
  if (loading) return '';
  const AvatarImgUrl = data && data.getUserInfo.profile_pic_main; // fix thành avatar ở backend gửi
  return (<Logo src={AvatarImgUrl} />);
};

export default AvatarImg;
