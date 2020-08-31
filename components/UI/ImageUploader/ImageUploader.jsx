/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import React from 'react';
import { toast } from 'react-toastify';
import Upload from '../Antd/Upload/Upload';
import Modal from '../Antd/Modal/Modal';
import Button from 'components/UI/Antd/Button/Button';
import { FaCamera } from 'react-icons/fa';
import { ImageUpload } from './ImageUploader.style';

// import { v4 as uuid } from 'uuid';
// import config from 'apollo-graphql/aws-exports';
// import { createTodo as CreateTodo } from 'apollo-graphql/aws-graphql/mutations';

// const {
//   aws_user_files_s3_bucket_region: region,
//   aws_user_files_s3_bucket: bucket
// } = config
export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      loadingProfile: false,
      loadingCover: false,
      // fileList: [
      //   {
      //     uid: '-1',
      //     name: 'xxx.png',
      //     status: 'done',
      //     url:
      //           'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      // ],
      fileList: props.gallery,
    };
  }


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file }) => {
    this.setState({ fileList });
    // eslint-disable-next-line react/destructuring-assignment
    if (file.response !== 'removed') { this.props.setUrl(fileList); }
  }

  handleRemove = (file) => {
    const { deleteUrl } = this.props;
    if (file.id) {
      const temp = { id: file.id };
      // Cần nhận object
      return deleteUrl.push(temp);
    }
  }

  handleSetProfilePic= () => {
    const {
      payloadUser, setProfilePic, addItem, profile_pic_main,
    } = this.props;
    const { previewImage } = this.state;
    if (previewImage === profile_pic_main) {
      this.setState({
        previewVisible: false,
      });
      // Thường sẽ refresh lại rồi check, vì user này đang payload nên sẽ không
      // Pass validation này khi chưa refresh
      return toast.error('Must provide a different Image from the current', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    try {
      setProfilePic({
        variables: {
          url: previewImage,
        },
      });
      this.setState({ loadingProfile: true });
      setTimeout(() => {
        this.setState({ loadingProfile: false, previewVisible: false });
        toast.success('Profile Picture uploaded',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        payloadUser.profile_pic_main = previewImage;
        addItem('user', payloadUser);
      }, 3000);
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

  handleSetCoverPic= () => {
    const {
      payloadUser, setCoverPic, addItem, cover_pic_main,
    } = this.props;
    const { previewImage } = this.state;
    if (previewImage === cover_pic_main) {
      this.setState({
        previewVisible: false,
      });
      return toast.error('Must provide a different Image from the current', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    try {
      setCoverPic({
        variables: {
          url: previewImage,
        },
      });
      this.setState({ loadingCover: true });
      setTimeout(() => {
        this.setState({ loadingCover: false, previewVisible: false });
        toast.success('Cover Picture uploaded',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        payloadUser.cover_pic_main = previewImage;
        addItem('user', payloadUser);
      }, 3000);
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
  // async createProduct({fileList}) {
  //   if (fileList) {
  //     const extension = fileList[0].name.split(".")[1]
  //     const { type: mimeType } = fileList
  //     const key = `images/${uuid()}${productName}.${extension}`
  //     const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
  //     const inputData = { name: fileList[0].name , image: fileList[0].url }

  //     try {
  //       await Storage.put(key, fileList, {
  //         contentType: mimeType
  //       })
  //       await API.graphql(graphqlOperation(CreateTodo, { input: inputData }))
  //       console.log('successfully stored user data!')
  //     } catch (err) {
  //       console.log('error: ', err)
  //     }
  //   }
  // }
  render() {
    const {
      previewVisible, previewImage, fileList, loadingProfile, loadingCover,
    } = this.state;
    const { Dragger } = Upload;
    // const props = {
    //   beforeUpload: (file) => {
    //     this.setState((state) => ({
    //       fileList: [...state.fileList, file],
    //     }));
    //     return false;
    //   },
    // };
    const uploadButton = (
      <ImageUpload>
        <div className="image-drag-area">
          <FaCamera />
        </div>
        <div className="ant-upload-text">Upload Photos</div>
      </ImageUpload>
    );
    return (
      <div className="clearfix">
        <Dragger
          // action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          name="file"
          progress
          onRemove={this.handleRemove}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={previewImage}
          className="image_uploader"
          // {...props}
          // action="http://localhost:3000/api/uploadFile"
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Dragger>
        <Modal
          visible={previewVisible}
          closable
          onCancel={this.handleCancel}
          onOk
          footer={[
            <>
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>
              <Button key="submitProfilePic" type="primary" loading={loadingProfile} onClick={this.handleSetProfilePic}>
                Set as Profile Picture
              </Button>
              <Button key="submitCoverPic" type="primary" loading={loadingCover} onClick={this.handleSetCoverPic}>
                Set as Cover Picture
              </Button>
            </>,
          ]}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
