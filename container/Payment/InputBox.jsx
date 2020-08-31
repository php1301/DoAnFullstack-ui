/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Input from 'components/UI/Antd/Input/Input';
import { InputBoxWrapper } from 'container/Payment/Payment.style';

const InputBox = ({
  label, placeholder, important, defaultValue,
}) => (
  <InputBoxWrapper className="isoInputBox">
    <label>
      {label}
      {important ? <span style={{ color: 'red' }} className="asterisk">*</span> : null}
    </label>
    <Input size="large" placeholder={placeholder} defaultValue={defaultValue} />
  </InputBoxWrapper>
);

export default InputBox;
