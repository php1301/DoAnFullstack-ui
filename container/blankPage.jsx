import React from 'react';
// destructuring ngay lúc truyền vào
// //const BlankPage = (props) => {
//     const { children } = props;
//     return <>{children}</>;
//   };
// //
const BlankPage = ({ children }) => (
  <>
    {children}
  </>
);
export default BlankPage;
