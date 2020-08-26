/* eslint-disable react/no-danger */
import { useQuery } from 'react-apollo';
import Map, { MapDataProcessing } from 'components/Map/Map';
import Tag from 'components/UI/Antd/Tag/Tag';
import Popover from 'components/UI/Antd/Popover/Popover';
import { GET_TRANSACTION_DETAILS } from 'apollo-graphql/query/query';
import Loader from 'components/Loader/Loader';

const Invoice = ({ params }) => {
  const { data, loading, error } = useQuery(GET_TRANSACTION_DETAILS, {
    variables: {
      transactionSecretKey: params,
    },
  });
  if (loading) return <Loader />;
  if (error) return `Error ${error} has occurred`;
  const content = (
    <div>
      <p>
        <Tag color="grey">PENDING</Tag>
        : Your transaction is still waiting for Hotel Manager Confirmation
      </p>
      <p>
        <Tag color="geekblue">DONE</Tag>
        : Your transactions is confirmed and you can begin your trip
      </p>
      <p>
        <Tag color="magenta">CANCELLED</Tag>
        : Your transactions is cancelled and you will be refunded
      </p>
    </div>
  );
  const transactionDetails = data.getTransactionDetails[0];
  const location = {
    price: transactionDetails.transactionPrice,
    lat: transactionDetails.transactionLocationLat,
    lng: transactionDetails.transactionLocationLng,
    type: 'txid',
    formattedAddress: transactionDetails.transactionLocationFormattedAddress || 'None',
  };
  return (
    <>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
        '\n    @media screen {\n      img {\n        max-width: 100%;\n      }\n      td,\n      th {\n        box-sizing: border-box;\n      }\n      u~div .wrapper {\n        min-width: 100vw;\n      }\n      a[x-apple-data-detectors] {\n        color: inherit;\n        text-decoration: none;\n      }\n      .all-font-roboto {\n        font-family: Roboto, -apple-system, "Segoe UI", sans-serif !important;\n      }\n      .all-font-sans {\n        font-family: -apple-system, "Segoe UI", sans-serif !important;\n      }\n    }\n    @media (max-width: 600px) {\n      .sm-inline-block {\n        display: inline-block !important;\n      }\n      .sm-hidden {\n        display: none !important;\n      }\n      .sm-leading-32 {\n        line-height: 32px !important;\n      }\n      .sm-p-20 {\n        padding: 20px !important;\n      }\n      .sm-py-12 {\n        padding-top: 12px !important;\n        padding-bottom: 12px !important;\n      }\n      .sm-text-center {\n        text-align: center !important;\n      }\n      .sm-text-xs {\n        font-size: 12px !important;\n      }\n      .sm-text-lg {\n        font-size: 18px !important;\n      }\n      .sm-w-1-4 {\n        width: 25% !important;\n      }\n      .sm-w-3-4 {\n        width: 75% !important;\n      }\n      .sm-w-full {\n        width: 100% !important;\n      }\n    }\n  ',
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
        '\n    @media (max-width: 600px) {\n      .sm-dui17-b-t {\n        border: solid #4299e1;\n        border-width: 4px 0 0;\n      }\n    }\n  ',
          }}
        />
        <table
          className="wrapper all-font-sans"
          width="100%"
          height="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: 24 }} width="100%">
                <table
                  className="sm-w-full"
                  width={600}
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan={2}
                        className="sm-inline-block"
                        style={{ display: 'none' }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-0.3.5&s=fed02ccbe457c9b8fc1f2cf76f30d755&w=600&h=400&q=80&fit=crop"
                          alt="Double Room"
                          style={{
                            border: 0,
                            verticalAlign: 'middle',
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            boxShadow:
                        '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="sm-hidden"
                        style={{ paddingTop: 40, paddingBottom: 40 }}
                        width={160}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-0.3.5&s=fed02ccbe457c9b8fc1f2cf76f30d755&w=320&h=800&q=80&fit=crop"
                          alt="Double room"
                          style={{
                            border: 0,
                            verticalAlign: 'middle',
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            boxShadow:
                        '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
                          }}
                          width={160}
                        />
                      </td>
                      <td
                        align="left"
                        className="sm-p-20 sm-dui17-b-t"
                        style={{
                          borderRadius: 2,
                          padding: 40,
                          position: 'relative',
                          boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
                          verticalAlign: 'top',
                          zIndex: 50,
                        }}
                        bgcolor="#ffffff"
                        valign="top"
                      >
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td width="80%">
                                <h1
                                  className="sm-text-lg all-font-roboto"
                                  style={{
                                    fontWeight: 700,
                                    margin: 0,
                                    marginBottom: 4,
                                    fontSize: 24,
                                  }}
                                >
                                  {`Receipt of: ${transactionDetails.transactionAuthorName}`}
                                </h1>
                                <p
                                  className="sm-text-xs"
                                  style={{
                                    margin: 0,
                                    color: '#a0aec0',
                                    fontSize: 14,
                                  }}
                                >
                                  <>
                                    Your reservation status
                                    <Tag
                                      style={{ marginLeft: '7px' }}
                                      color={
                                      (transactionDetails.transactionStatus === 'PENDING' && 'gray')
                                      || (transactionDetails.transactionStatus === 'DONE' && 'geekblue')
                                      || (transactionDetails.transactionStatus === 'CANCELLED' && 'magenta')
                                      }
                                    >
                                      {transactionDetails.transactionStatus}
                                    </Tag>
                                    <br />
                                    <h3>{`Hotel Name: ${transactionDetails.transactionHotelName}`}</h3>
                                    <h3>{`Hotel Type: ${transactionDetails.transactionHotelType}`}</h3>
                                  </>
                                </p>
                              </td>
                              <td
                                style={{ textAlign: 'right' }}
                                width="20%"
                                align="right"
                              >
                                <Popover content={content}>
                                  <a
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <img
                                      src="https://image.flaticon.com/icons/svg/189/189664.svg"
                                      alt="Download PDF"
                                      style={{
                                        border: 0,
                                        verticalAlign: 'middle',
                                        fontSize: 12,
                                      }}
                                      width={24}
                                    />
                                  </a>
                                </Popover>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ lineHeight: 5 }}>‌</div>
                        <table
                          className="sm-leading-32"
                          style={{ lineHeight: 5, fontSize: 14 }}
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                className="sm-inline-block"
                                style={{ color: '#718096' }}
                                width="50%"
                              >
                                Guest
                              </td>
                              <td
                                className="sm-inline-block"
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionGuest}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="sm-inline-block"
                                style={{ color: '#718096' }}
                                width="50%"
                              >
                                Room
                              </td>
                              <td
                                className="sm-inline-block"
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionRoom}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="sm-inline-block"
                                style={{ color: '#718096' }}
                                width="50%"
                              >
                                Nights
                              </td>
                              <td
                                className="sm-inline-block"
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionRange}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="sm-w-1-4 sm-inline-block"
                                style={{ color: '#718096' }}
                                width="50%"
                              >
                                Address
                              </td>
                              <td
                                className="sm-w-3-4 sm-inline-block"
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionLocationFormattedAddress || 'None'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <div
                                  style={{
                                    backgroundColor: '#edf2f7',
                                    height: 2,
                                    lineHeight: 2,
                                  }}
                                >
                                  ‌
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <Map>
                                <MapDataProcessing location={location} multiple={false} />
                              </Map>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <div
                                  style={{
                                    backgroundColor: '#edf2f7',
                                    height: 2,
                                    lineHeight: 2,
                                  }}
                                >
                                  ‌
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          style={{ fontSize: 14 }}
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td
                                className="sm-w-full sm-inline-block sm-text-center"
                                width="40%"
                              >
                                <p
                                  className="all-font-roboto"
                                  style={{
                                    margin: 0,
                                    marginBottom: 4,
                                    color: '#a0aec0',
                                    fontSize: 10,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                  }}
                                >
                                  Check-in
                                </p>
                                <p
                                  className="all-font-roboto"
                                  style={{
                                    fontWeight: 600,
                                    margin: 0,
                                    color: '#000000',
                                  }}
                                >
                                  {transactionDetails.transactionStartDate.slice(0, -8)}
                                </p>
                              </td>
                              <td
                                className="sm-w-full sm-inline-block sm-py-12"
                                style={{
                                  fontFamily: 'Menlo, Consolas, monospace',
                                  fontWeight: 600,
                                  textAlign: 'center',
                                  color: '#cbd5e0',
                                  fontSize: 18,
                                  letterSpacing: '-1px',
                                }}
                                width="20%"
                                align="center"
                              >
                                &gt;&gt;&gt;
                              </td>
                              <td
                                className="sm-w-full sm-inline-block sm-text-center"
                                style={{ textAlign: 'right' }}
                                width="40%"
                                align="right"
                              >
                                <p
                                  className="all-font-roboto"
                                  style={{
                                    margin: 0,
                                    marginBottom: 4,
                                    color: '#a0aec0',
                                    fontSize: 10,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                  }}
                                >
                                  Check-out
                                </p>
                                <p
                                  className="all-font-roboto"
                                  style={{
                                    fontWeight: 600,
                                    margin: 0,
                                    color: '#000000',
                                  }}
                                >
                                  {transactionDetails.transactionEndDate.slice(0, -8)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <div
                                  style={{
                                    backgroundColor: '#edf2f7',
                                    height: 2,
                                    lineHeight: 2,
                                  }}
                                >
                                  ‌
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          style={{ lineHeight: 5, fontSize: 14 }}
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ color: '#718096' }} width="50%">
                                Coupon Applied
                              </td>
                              <td
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionCoupon}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ color: '#718096' }} width="50%">
                                Coupon Value
                              </td>
                              <td
                                style={{ fontWeight: 600, textAlign: 'right' }}
                                width="50%"
                                align="right"
                              >
                                {transactionDetails.transactionCouponValue}
                                {transactionDetails.transactionCouponType === 1 ? '%' : ''}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  fontWeight: 600,
                                  paddingTop: 32,
                                  color: '#000000',
                                  fontSize: 20,
                                }}
                                width="50%"
                              >
                                Total
                              </td>
                              <td
                                style={{
                                  fontWeight: 600,
                                  paddingTop: 32,
                                  textAlign: 'right',
                                  color: '#68d391',
                                  fontSize: 20,
                                }}
                                width="50%"
                                align="right"
                              >
                                {`$${transactionDetails.transactionPrice}.00/USD`}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <div
                                  style={{
                                    backgroundColor: '#edf2f7',
                                    height: 2,
                                    lineHeight: 2,
                                  }}
                                >
                                  ‌
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingTop: 24, paddingBottom: 24 }}>
                                <h1>Hotel Manager Contact Information</h1>
                                <h3>
                                  {`Hotel Manager Name:
                               ${transactionDetails.transactionHotelManager.first_name} 
                               ${transactionDetails.transactionHotelManager.last_name}`}
                                </h3>
                                <h3>{`Hotel Manger Cellnumber: ${transactionDetails.transactionHotelManager.cellNumber || '00x00'}`}</h3>
                                <h3>{`Hotel Manger Email: ${transactionDetails.transactionHotelManager.email}`}</h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export async function getServerSideProps({ params }) {
  return {
    props: { params: params.txid[0] },
  };
}
export default Invoice;
