
// default data cho CategorySearch
export const priceInit = {
  0: '$0',
  1000: '$1000',
};

export const calendarItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

export const getAmenities = {
  id: 1,
  name: 'Amenities',
  identifier: 'amenities',
  options: [
    { label: 'Free Wi-Fi', value: 'free-wifi' },
    { label: 'Free Parking', value: 'free-parking' },
    { label: 'Breakfast included(x)', value: 'breakfast' },
    { label: 'Pool', value: 'pool' },
    { label: 'Air Conditioning', value: 'air-condition' },
    { label: 'Hot Shower(x)', value: 'hot-shower' },
    { label: 'Cable TV(x)', value: 'cable-tv' },
  ],
};

export const getPropertyType = {
  id: 2,
  name: 'Property Type',
  identifier: 'propertyType',
  options: [
    { label: 'Villa', value: 'Villa' },
    { label: 'Hotel', value: 'Hotel' },
    { label: 'Resort', value: 'Resort' },
    { label: 'Cottage', value: 'Cottage' },
    { label: 'Duplex', value: 'Duplex' },
    { label: 'Landscape', value: 'Landscape' },
  ],
};

export const sortListing = {
  id: 6,
  name: 'Sort',
  identifier: 'sortListing',
  options: [
    { label: 'Rating ASC', value: 'rating_ASC' },
    { label: 'Rating DESC', value: 'rating_DESC' },
    { label: 'Created ASC', value: 'createdAt_ASC' },
    { label: 'Created DESC', value: 'createdAt_DESC' },
    { label: 'Reviews MOST', value: 'ratingCount_DESC' },
    { label: 'Reviews LEAST', value: 'ratingCount_ASC' },
    { label: 'Price ASC', value: 'price_ASC' },
    { label: 'Price DESC', value: 'price_DESC' },
  ],
};
