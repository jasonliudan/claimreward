import useWindowSize from 'hooks/useWindowSize';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { selectThemeKey } from 'styles/theme/slice/selectors';

export function Logo() {
  const { width } = useWindowSize();

  return (
    <Wrapper>
      <LogoImg
        src={width > 375 ? 'images/logo.svg' : 'images/logo.svg'}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 35px;
`;
