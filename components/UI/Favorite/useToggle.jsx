import { useState, useCallback } from 'react';
// kỉ thuật làm toggle bằng cách truyền value từ server
const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  // Thay vi sử dụng prevState thì sử dụng useCallBack
  const toggler = useCallback(() => setValue((prevValue) => !prevValue), []);
  return [value, toggler];
};
export default useToggle;
