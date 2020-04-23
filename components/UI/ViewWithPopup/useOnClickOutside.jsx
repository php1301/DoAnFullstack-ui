import { useEffect } from 'react';
// Xử lý click ngoài modal thì out
// hooks useOnClickOutside
// eslint-disable-next-line import/prefer-default-export
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Không làm gì nếu click ref hoặc phần tử thấp hơn
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
