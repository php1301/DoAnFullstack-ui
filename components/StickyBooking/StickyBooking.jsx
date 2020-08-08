import React from 'react';
import useWindowSize from './useWindowSize';
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

const StickyBooking = ({
  logo, title, price, rating, action, className,
}) => {
  // Add all classs to an array
  const addAllClasses = ['sticky_booking'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  // useWindowSize hook
  let widthWindow = 0;
  if (typeof window !== 'undefined') {
    widthWindow = useWindowSize();
  }
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
            {rating && <HotelRating>{rating}</HotelRating>}
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
