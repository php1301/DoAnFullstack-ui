// Comp portal được chèn vào DOM sau
// Modal được mounted, có nghĩa là children
// sẽ được gắn trên một node DOM tách rời. Nếu children
// yêu cầu phải được gắn vào cây DOM
// ngay lập tức khi được mounted, ví dụ để đo Dom node
// Hoặc sử dụng 'autoFocus' trong lóp cha, thêm
// state cho Modal và chỉ render children khi Modal
// được DOM.
//* *Xử lý riêng style modal, outside click*/
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Portal({ children, rendererId }) {
  const [containerEl] = useState(document.createElement('div'));
  useEffect(() => {
    const portalRoot = document.getElementById(rendererId) || document.body;
    portalRoot.appendChild(containerEl);
    return () => portalRoot.removeChild(containerEl);
  });
  return ReactDOM.createPortal(children, containerEl);
}
