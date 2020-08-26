import React from 'react';
import ImageGallery from 'react-image-gallery';
import ImageGalleryWrapper from './ImageGallery.style';

// Mock

// import PostImage1 from 'assets/images/post-image-1.jpg';
// import PostImage2 from 'assets/images/post-image-2.jpg';
// import PostThumb1 from 'assets/images/post-thumb-1.jpg';
// import PostThumb2 from 'assets/images/post-thumb-2.jpg';

// const images = [
//   {
//     original: PostImage1,
//     thumbnail: PostThumb1,
//   },
//   {
//     original: PostImage2,
//     thumbnail: PostThumb2,
//   },
// ];

const PostImageGallery = ({ gallery }) => {
  const temp = [];
  gallery.map((i) => {
    temp.push({
      original: i.url,
    });
    return temp;
  });
  // Ảnh gallery từ mock data sẽ có quality thấp
  return (
    <ImageGalleryWrapper>
      <ImageGallery
        items={temp}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex
        lazyLoad
        slideDuration={550}
      />
    </ImageGalleryWrapper>
  );
};

export default PostImageGallery;
