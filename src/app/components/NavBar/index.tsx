import * as React from 'react';
import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { NavWithWallet } from './NavWithWallet';
import { PageWrapper } from '../PageWrapper';
import { useHistory } from 'react-router-dom';

export function NavBar() {
  const {
    location: { pathname },
  } = useHistory();

  const Wrapper = styled.header`
    height: ${StyleConstants.NAV_BAR_HEIGHT};
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    background: ${p =>
      pathname === '/' ? 'transparent !important' : p.theme.background};
    z-index: 2;

    @supports (backdrop-filter: blur(10px)) {
      backdrop-filter: blur(10px);
      background: ${p =>
        p.theme.background.replace(
          /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
          'rgba$1,0.75)',
        )};
    }

    ${PageWrapper} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `;

  console.log('path name', pathname);

  return (
    <Wrapper>
      <PageWrapper>
        <Logo />
        <NavWithWallet />
      </PageWrapper>
    </Wrapper>
  );
}
