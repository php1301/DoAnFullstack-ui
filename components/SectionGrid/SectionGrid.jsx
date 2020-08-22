/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../UI/Text/Text';
import Box from '../UI/Box/Box';
import Button from '../UI/Antd/Button/Button';
import Pagination from '../UI/Antd/Pagination/Pagination';

import ProductCard from '../ProductCard/ProductCard';
import { findIndex } from 'lodash';

const LoadMore = ({
  handleLoadMore,
  showButton,
  buttonText,
  loading,
  loadMoreComponent,
  loadMoreStyle,
}) => (
  !!showButton && (
  <Box className="loadmore_wrapper" {...loadMoreStyle}>
    {loadMoreComponent || (
    <Button loading={loading} onClick={handleLoadMore}>
      {buttonText || 'Load More'}
    </Button>
    )}
  </Box>
  )
);

export default function SectionGrid({
  data = [],
  totalItem,
  limit,
  columnWidth,
  paginationComponent,
  handleLoadMore,
  loadMoreComponent,
  placeholder,
  loading,
  buttonText,
  rowStyle,
  columnStyle,
  loadMoreStyle,
  link,
  type,
  heart,
}) {
  const n = limit ? Number(limit) : 1;
  const limits = Array(n).fill(0);

  const showButton = data.length < totalItem;
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);

  const handleChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(6);
    } else {
      setMinValue(value * n - n);
      setMaxValue(value * n);
    }
  };
  const dataToRender = type === 'listed' || type === 'favorite' ? data.slice(minValue, maxValue) : data;
  const heartValue = (id) => (findIndex(heart, { id }) === -1 ? -1 : 1);
  return (
    <>
      <Box className="grid_wrapper" {...rowStyle}>
        {dataToRender && dataToRender.length
          ? dataToRender.map((item) => (
            <Box
              className="grid_column"
              width={columnWidth}
              key={item.id}
              {...columnStyle}
            >
              <ProductCard type={type} heart={heartValue(item.id)} link={link} {...item} />
            </Box>
          ))
          : null}
        {loading
            && limits.map(() => (
              <Box
                className="grid_column"
                width={columnWidth}
                key
                {...columnStyle}
              >
                {placeholder || <Text content="Loading ..." />}
              </Box>
            ))}
      </Box>

      {(type === 'listed' || type === 'favorite') && data.length > 0 && (
        <Pagination
          total={data.length}
          hideOnSinglePage
          defaultPageSize={n}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Hotels`}
          onChange={handleChange}
        />
      )}
      {data.length === 0 && (<Text content="Nothing to show" />)}
      {showButton && (
      <LoadMore
        showButton={showButton}
        handleLoadMore={handleLoadMore}
        loading={loading}
        buttonText={buttonText}
        loadMoreComponent={loadMoreComponent}
        loadMoreStyle={loadMoreStyle}
      />
      )}
      {paginationComponent && (
      <Box className="pagination_wrapper">{paginationComponent}</Box>
      )}
    </>
  );
}

SectionGrid.propTypes = {
  data: PropTypes.array.isRequired,
  totalItem: PropTypes.number,
  columnWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  paginationComponent: PropTypes.element,
  handleLoadMore: PropTypes.func,
  loadMoreComponent: PropTypes.element,
  placeholder: PropTypes.element,
  loading: PropTypes.bool,
  limit: PropTypes.number,
  buttonText: PropTypes.string,
  rowStyle: PropTypes.object,
  columnStyle: PropTypes.object,
  loadMoreStyle: PropTypes.object,
};

SectionGrid.defaultProps = {
  rowStyle: {
    flexBox: true,
    flexWrap: 'wrap',
    mr: ['-10px', '-10px', '-10px', '-10px', '-10px', '-15px'],
    ml: ['-10px', '-10px', '-10px', '-10px', '-10px', '-15px'],
  },
  columnStyle: {
    pr: ['10px', '10px', '10px', '10px', '10px', '15px'],
    pl: ['10px', '10px', '10px', '10px', '10px', '15px'],
  },
  loadMoreStyle: {
    flexBox: true,
    justifyContent: 'center',
    mt: '1rem',
  },
};
