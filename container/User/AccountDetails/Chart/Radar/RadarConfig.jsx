/* eslint-disable no-return-assign */
const processRadarData = (data) => {
  let hotel = 0;
  let villa = 0;
  let duplex = 0;
  let cottage = 0;
  let landscape = 0;
  let resort = 0;
  data.map((i) => {
    if (i.propertyType === 'Hotel') hotel += 1;
    if (i.propertyType === 'Villa') villa += 1;
    if (i.propertyType === 'Resort') duplex += 1;
    if (i.propertyType === 'Duplex') cottage += 1;
    if (i.propertyType === 'Cottage') landscape += 1;
    if (i.propertyType === 'Landscape') resort += 1;
  });
  return {
    labels: [
      'Hotel',
      'Villa',
      'Duplex',
      'Cottage',
      'Landscape',
      'Resort',
    ],
    datasets: [
      {
        label: 'Hotel, Villa, Duplex',
        backgroundColor: 'rgba(72,166,242,0.2)',
        borderColor: 'rgba(72,166,242,1)',
        pointBackgroundColor: 'rgba(72,166,242,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(72,166,242,1)',
        data: [
          hotel + Math.floor(Math.random() * 10) + 1,
          villa + Math.floor(Math.random() * 10) + 1,
          duplex + Math.floor(Math.random() * 10) + 1,
        ],
      },
      {
        label: 'Cottage, landscape, resort',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          cottage + Math.floor(Math.random() * 10) + 1,
          landscape + Math.floor(Math.random() * 10) + 1,
          resort + Math.floor(Math.random() * 10) + 1,
        ],
      },
    ],
  };
};
export { processRadarData };
