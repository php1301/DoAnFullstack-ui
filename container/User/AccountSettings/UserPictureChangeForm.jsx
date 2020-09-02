/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import ImageUploader from 'components/UI/ImageUploader/ImageUploader';
import Button from 'components/UI/Antd/Button/Button';
import Heading from 'components/UI/Heading/Heading';
import { AuthContext } from 'context/AuthProvider';
import { GET_USER_INFO } from 'apollo-graphql/query/query';
import { AgentPictureUploader, FormTitle } from './UserAccountSettings.style';
import {
  UPDATE_PHOTOS, DELETE_PHOTOS, SET_PROFILE_PIC, SET_COVER_PIC,
} from 'apollo-graphql/mutation/mutation';


export default function AgentPictureChangeForm({ payloadUser, user }) {
  const [url, setUrl] = useState([]);
  const [captcha, setCaptcha] = useState(false);
  const { addItem } = useContext(AuthContext);
  const [deleteUrl, setDeleteUrl] = useState([]);
  const { gallery, profile_pic_main, cover_pic_main } = user;
  const [updatePhotos] = useMutation(UPDATE_PHOTOS);
  const [deletePhotos] = useMutation(DELETE_PHOTOS);
  const [setProfilePic] = useMutation(SET_PROFILE_PIC, {
    refetchQueries: () => [
      {
        query: GET_USER_INFO,
        variables: {
          id: user.id,
        },
      },
    ],
  });
  const [setCoverPic] = useMutation(SET_COVER_PIC, {
    refetchQueries: () => [
      {
        query: GET_USER_INFO,
        variables: {
          id: user.id,
        },
      },
    ],
  });
  const handleUpload = () => {
    let count = 0;
    if (captcha) {
      const formData = new FormData();
      if (deleteUrl.length !== 0) {
        try {
          deletePhotos({
            variables: {
              photos: deleteUrl,
            },
          });
          toast.success(deleteUrl.length === 1 ? 'Photo deleted!' : 'Photos deleted!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (e) {
          toast.error(e, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }

      url && url.length > 1 && url.forEach((file) => {
        if (file.status === 'done') {
          count++;
          formData.append('files[]', file.originFileObj);
          // Nhớ mang theo uuid
          // formData.append('files[]', file.uuid);
        }
      });
      // Tránh spam API
      // Tắt url khi demo xong
      // Đổi service sang Imgur
      // Kiểm tra spam
      // Captcha
      // etc...
      if (count > 1) {
        fetch('https://api.hotel-prisma.ml/api/uploadFile', {
          method: 'POST',
          body: formData,
        })
          .then((data) => data.json())
          .then((r) => {
            // eslint-disable-next-line no-unused-expressions
            updatePhotos({
              variables: {
                photos: r,
              },
            });
          })
          .then(toast.success('Photos Gallery Updated! 🦄 To avoid spamming, page will be reloaded', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
          setTimeout(() => {
            window.location.reload();
          }, 3000))
          .catch((error) => {
            toast.error(error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        toast.error('To avoid spamming, must update new 2 unique pictures. Set ProfilePic and CoverPic still happen', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Please check the reCaptcha box', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCheckCaptcha = () => {
    setCaptcha(true);
  };
  return (
    <AgentPictureUploader>
      <FormTitle>Gallery Stocks</FormTitle>
      <Heading content="Your Gallery" as="h4" />
      <ImageUploader
        url={url}
        setUrl={setUrl}
        gallery={gallery}
        deleteUrl={deleteUrl}
        setDeleteUrl={setDeleteUrl}
        payloadUser={payloadUser}
        setProfilePic={setProfilePic}
        setCoverPic={setCoverPic}
        profile_pic_main={profile_pic_main}
        cover_pic_main={cover_pic_main}
        addItem={addItem}
      />
      <ReCAPTCHA
        onExpired={() => { setCaptcha(false); }}
        onChange={handleCheckCaptcha}
        sitekey="6LcNw8YZAAAAAPidpXhKmC6OlATc9nKGBf6a_mUi"
      />
      {/* <Heading content="Profile Image" as="h4" />
      <ImageUploader setUrl={setUrl} /> */}

      <div className="submit-container">
        <Button onClick={handleUpload} htmlType="submit" type="primary">
          Save Changes
        </Button>
      </div>
    </AgentPictureUploader>
  );
}
