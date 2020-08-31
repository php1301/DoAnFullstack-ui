import React, { useState } from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Card from 'components/UI/Card/Card';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import Modal from 'components/UI/Antd/Modal/Modal';
import RenderReservationForm from './RenderReservationForm';
import OffersTable from './OffersTable';

const CardHeader = ({
  price,
  priceStyle,
  pricePeriodStyle,
  linkStyle,
  contactNumber,
  agentName,
  agentEmail,
  visible,
  setVisible,
  isNegotiable,
  guestRoom,
  bedRoom,
}) => (
  <>
    <Heading
      content={(
        <>
          $
          {price}
          {' '}
          <Text as="span" content="/night" {...pricePeriodStyle} />
          <br />

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
            {...pricePeriodStyle}
          />
        </>
        )}
      {...priceStyle}
    />
    <a
      style={{ ...linkStyle }}
    >
      {`Rooms: ${bedRoom || 0}` }
    </a>
    <a
      style={{ ...linkStyle }}
    >
      {`Guest: ${guestRoom || 0}`}
    </a>
    <Modal
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closable
    >
      <h2>{agentName}</h2>
      <h2>{agentEmail}</h2>
      <h2>{contactNumber}</h2>
    </Modal>
    <a
      tabIndex={0}
      role="button"
      onKeyDown={() => setVisible(true)}
      type="button"
      content="Contact Hotel"
      style={{ ...linkStyle }}
      onClick={() => setVisible(true)}
    >
      Contact Hotel
    </a>
    <Modal
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closable
    >
      <h2>{agentName}</h2>
      <h2>{agentEmail}</h2>
      <h2>{contactNumber}</h2>
    </Modal>
  </>
);

export default function Reservation({
  linkStyle,
  price,
  contactNumber,
  agentName,
  agentEmail,
  agentId,
  isNegotiable,
  guestRoom,
  bedRoom,
  id,
  title,
  propertyType,
  lat,
  lng,
  address,
}) {
  const [visible, setVisible] = useState(false);
  const [offersVisible, setOffersVisible] = useState(false);
  return (
    <Card
      className="reservation_sidebar"
      header={(
        <CardHeader
          visible={visible}
          setVisible={setVisible}
          agentEmail={agentEmail}
          contactNumber={contactNumber}
          agentName={agentName}
          price={price}
          isNegotiable={isNegotiable}
          guestRoom={guestRoom}
          bedRoom={bedRoom}
        />
      )}
      content={(
        <RenderReservationForm
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
      )}
      footer={(
        <p>
          Special offers available.
          <a
            tabIndex="-1"
            role="button"
            onClick={() => { setOffersVisible(true); }}
            onKeyDown={() => { setOffersVisible(true); }}
            style={{ ...linkStyle }}
          >
            See details
          </a>
          <Modal
            onCancel={() => { setOffersVisible(false); }}
            onOk={() => { setOffersVisible(false); }}
            visible={offersVisible}
          >
            <OffersTable id={id} />
          </Modal>
        </p>
      )}
    />
  );
}

CardHeader.propTypes = {
  priceStyle: PropTypes.object,
  pricePeriodStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

CardHeader.defaultProps = {
  priceStyle: {
    color: '#2C2C2C',
    fontSize: '25px',
    fontWeight: '700',
  },
  pricePeriodStyle: {
    fontSize: '15px',
    fontWeight: '400',
  },
  linkStyle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#008489',
    marginRight: '3px',
  },
};
