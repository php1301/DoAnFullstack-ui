import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import Rating from 'components/UI/Rating/Rating';
import Button from 'components/UI/Antd/Button/Button';
import Modal from 'components/UI/Antd/Modal/Modal';
import StickyBooking from 'components/StickyBooking/StickyBooking';
import LogoImage from 'assets/images/logo-alt.svg';
import Reservation from './Reservation';

const BottomReservation = ({
  title,
  price,
  rating,
  ratingCount,
  isNegotiable,
  guestRoom,
  bedRoom,
  id,
  agentId,
  propertyType,
  lat,
  lng,
  address,
}) => {
  // modal and reservation control state
  const [state, setState] = useState(false);

  // handle photo gallery modal
  const toggleModal = () => {
    setState(!state);
  };

  // handle photo gallery modal cancel
  const handleCancel = () => {
    setState(!state);
  };

  return (
    <>
      <StickyBooking
        logo={LogoImage}
        title={title}
        price={price}
        isNegotiable={isNegotiable}
        propertyType={propertyType}
        guestRoom={guestRoom}
        bedRoom={bedRoom}
        rating={
          <Rating rating={rating} ratingCount={ratingCount} type="bulk" />
        }
        action={(
          <Button type="primary" onClick={toggleModal}>
            Book
          </Button>
        )}
      />

      <Modal
        visible={state}
        onCancel={handleCancel}
        footer={null}
        maskStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        wrapClassName="reservation_modal"
        closable={false}
      >
        <Reservation
          id={id}
          agentId={agentId}
          lat={lat}
          lng={lng}
          address={address}
          guestRoom={guestRoom}
          bedRoom={bedRoom}
          title={title}
          propertyType={propertyType}
          price={price}
        />
        <Button onClick={handleCancel} className="close">
          <IoIosClose />
        </Button>
      </Modal>
    </>
  );
};

export default BottomReservation;
