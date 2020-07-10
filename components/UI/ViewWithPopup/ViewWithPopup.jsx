/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './useOnClickOutside';
import Portal from '../Portal/Portal';
import { Wrapper, Container } from './ViewWithPopup.style';

export default function ViewWithPopup({
  view,
  popup,
  noView = false,
  style,
  className,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const ref = useRef();
  // dùng ref bắt thuộc tính DOM node, ở đây là click ra ngoài
  // bắt ref của clickOutSide
  useOnClickOutside(ref, () => setShowPopup(false));
  // kĩ thuật gắn tên class
  const addAllClasses = ['view_with__popup'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }
  return (
    <Wrapper className={`${addAllClasses.join(' ')} ${showPopup ? 'active' : ''}`} ref={ref}>
      {/* có view và noView = false như set ở prop */}
      {view && noView && (
      <div className="popup_handler" onClick={() => setShowPopup(!showPopup)}>
        {view}
      </div>
      )}
      <Container
        className="popup_container"
        showPopup={showPopup}
        onClick={() => setShowPopup(true)}
        style={style}
      >
        {/* check null */}
        {view && !noView && view}
        {showPopup && (
        <div id="popup">
          <Portal rendererId="popup">{popup && popup}</Portal>
        </div>
        )}
      </Container>
    </Wrapper>
  );
}
