import React from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import useWindowSize from './useWindowSize';
import Text from 'components/UI/Text/Text';
import StickyBookingWrapper, {
  HotelInfo,
  InfoArea,
  Title,
  Logo,
  HotelAction,
  Price,
  ActionBtn,
  HotelRating,
} from './StickyBooking.style';
import Loader from 'components/Loader/Loader';

const StickyBooking = ({
  logo, title, price, rating, action, className, isNegotiable, bedRoom, guestRoom,
}) => {
  // Add all classs to an array
  const addAllClasses = ['sticky_booking'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // useWindowSize hook
  let widthWindow = 0;
  if (typeof window === 'undefined') {
    return <Loader />;
  }
  widthWindow = useWindowSize();
  const windowInnerWidth = process.browser && widthWindow.innerWidth;

  return (
    <StickyBookingWrapper className={addAllClasses.join(' ')}>
      <HotelInfo className="hotel_info">
        {windowInnerWidth > 767 && (
          <>{logo && <Logo src={logo} alt={title} />}</>
        )}

        {title || rating || price ? (
          <InfoArea>
            {windowInnerWidth > 767 ? (
              <>{title && <Title>{title}</Title>}</>
            ) : (
              <Price>
                <span>
                  $
                  {price}
                </span>
                {' '}
                / Night
              </Price>
            )}
            {
              <a style={{ color: '#008489', fontWeight: '700' }}>
                {`Rooms: ${bedRoom || 0} Guest: ${guestRoom || 0}`}
              </a>
            }
            {rating && <HotelRating>{rating}</HotelRating>}
            <Text
              as="span"
              content={isNegotiable
                ? (
                  <p>
                    Negotiable
                    {' '}
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </p>
                )
                : (
                  <p>
                    Negotiable
                    {' '}
                    <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  </p>
                )}
            />
          </InfoArea>
        ) : (
          ''
        )}
      </HotelInfo>

      <HotelAction className="hotel_action">
        {windowInnerWidth > 767 && (
          <Price>
            <span>
              $
              {price}
            </span>
            {' '}
            / Night
          </Price>
        )}
        <ActionBtn>{action}</ActionBtn>
      </HotelAction>
    </StickyBookingWrapper>
  );
};

export default StickyBooking;
