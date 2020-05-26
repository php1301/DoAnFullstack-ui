import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Input from '../Antd/Input/Input';
import InputIncDecWrapper from './InputIncDec.style';

const InputIncDec = ({
  className, increment, decrement, ...props
}) => {
  const addAllClasses = ['quantity'];
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <InputIncDecWrapper className={addAllClasses.join(' ')}>
      <button className="btn decBtn" type="button" onClick={decrement}>
        <MinusOutlined />
      </button>
      <Input className="qnt-input" type="number" {...props} />
      <button className="btn incBtn" type="button" onClick={increment}>
        <PlusOutlined />
      </button>
    </InputIncDecWrapper>
  );
};

export default InputIncDec;
