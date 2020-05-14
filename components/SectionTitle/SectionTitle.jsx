import React from 'react';
import SectionTitleExtended from '../UI/Title/Title';

import SectionTitleWrapper from './SectionTitle.style';

const SectionTitle = ({ ...props }) => (
  <SectionTitleWrapper>
    <SectionTitleExtended {...props} />
  </SectionTitleWrapper>
);

export default SectionTitle;
