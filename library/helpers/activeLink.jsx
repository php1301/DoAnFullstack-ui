/* eslint-disable react/prop-types */
import { withRouter } from 'next/router';
// xử lý router của nextjs - component link cho navbar
const ActiveLink = ({
  className, children, router, href,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href); // push theo href được truyền vào từ Layout->Header->MainMenu
  }; // xử lý sự kiện click
  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
