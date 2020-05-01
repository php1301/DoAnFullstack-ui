import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const LocationWrapper = styled.div`
  padding: 52px 0;
  @media only screen and (max-width: 480px) {
    padding: 30px 0;
  }
`;

export const CarouselSection = styled.div`
  .react-multi-carousel-list {
    .react-multi-carousel-item {
      padding: 0 10px;
      transition: transform 0.3s ease;

      .image_card {
        > a {
          @media only screen and (max-width: 1600px) {
            height: 310px;
          }
          @media only screen and (max-width: 991px) {
            height: 280px;
          }
        }
      }
    }

    .react-multiple-carousel__arrow {
      opacity: 0;
      visibility: hidden;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${themeGet('color.1', '#ffffff')};
      box-shadow: 0 3px 6px ${themeGet('boxShadow.1', 'rgba(0, 0, 0, 0.16)')};
      transition: background-color 0.2s ease;

      &::before {
        color: ${themeGet('primary.0', '#008489')};
      }

      &:hover {
        background-color: ${themeGet('primary.0', '#008489')};
        &::before {
          color: ${themeGet('color.1', '#ffffff')};
        }
      }
    }

    &:hover {
      .react-multiple-carousel__arrow {
        opacity: 1;
        visibility: visible;
      }
    }

    .react-multiple-carousel__arrow--left {
      left: 30px;
    }

    .react-multiple-carousel__arrow--right {
      right: 30px;
    }
  }
`;

export default LocationWrapper;
