import React from 'react';
import {
  Wrapper, Header, Content, Footer,
} from './Card.style';

export default function Card({
  title,
  className,
  header,
  content,
  children,
  footer,
}) {
  return (
    <Wrapper className={className}>
      <Header>{header || <h2>{title}</h2>}</Header>
      <Content>{content || children}</Content>
      {footer && <Footer>{footer}</Footer>}
    </Wrapper>
  );
}
