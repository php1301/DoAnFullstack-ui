import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const ImageGalleryWrapper = styled.div`
  .image-gallery-slides {
    border-radius: 3px;
    box-shadow: 0 2px 25px ${themeGet('boxShadow.1', 'rgba(0, 0, 0, 0.16)')};
  }

  .image-gallery-slide {
    .image-gallery-image {
      object-fit: cover;
    }
  }

  .image-gallery-icon {
    .image-gallery-svg {
      height: 80px;
      width: auto;
    }
    &:hover {
      color: ${themeGet('color.1', '#ffffff')};
    }
  }

  .image-gallery-index {
    padding: 0;
    font-size: 15px;
    font-weight: 700;
    position: static;
    margin: 30px 0 16px 0;
    background-color: transparent;
    color: ${themeGet('text.0', '#2C2C2C')};

    &:after {
      content: 'photos';
      display: inline-block;
      margin-left: 0.25em;
    }
  }

  .image-gallery-thumbnails-wrapper {
    .image-gallery-thumbnails {
      padding: 0;

      .image-gallery-thumbnail {
        width: 150px;
        padding: 0;
        margin: 0 20px 0 0;
        border: 0;
        border-radius: 3px;
        overflow: hidden;
        position: relative;

        &.active {
          border: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        &:before {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: ${themeGet('color.1', '#ffffff')};
          opacity: 0.7;
          z-index: 1;
          transform: scaleX(1);
          transform-origin: left center 0px;
          transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68) 0s;
        }

        &:hover,
        &.active {
          &:before {
            transform: scaleX(0);
            transform-origin: right center 0px;
            transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
          }
        }
      }
    }
  }
`;

export default ImageGalleryWrapper;
