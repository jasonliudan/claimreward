import useWallet from 'hooks/useWallet';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { slide as Menu } from 'react-burger-menu';
import { styles } from './hamburgerStyle';
import useWindowSize from 'hooks/useWindowSize';
import cycle from 'contracts/dART';
import Web3 from 'web3';
import config from 'contracts/config';
import MetamaskIcon from '../Icons/MetamaskIcon';

const StyledButton = styled.button`
  outline: none;
  border: ${p => `1px solid ${p.theme.secondary}`};
  color: ${p => p.theme.secondary};
  height: 40px;
  padding: 0 20px;
  line-height: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  user-select: none;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
`;

function WalletConnectButton() {
  const { wallet, connect } = useWallet();

  const formattedWallet = wallet
    ? wallet.slice(0, 6) + '...' + wallet.slice(-4)
    : '';

  return (
    <StyledButton role="button" onClick={connect}>
      {formattedWallet || (
        <CenteredDiv>
          Connect with &nbsp; <MetamaskIcon />
        </CenteredDiv>
      )}
    </StyledButton>
  );
}

export function NavWithWallet() {
  const {
    location: { pathname },
  } = useHistory();

  const NavItem = ({ href, children, ...props }) => (
    <Item href={href} role={href === pathname ? 'active' : ''} {...props}>
      {children}
    </Item>
  );

  const { width } = useWindowSize();

  const { wallet } = useWallet();

  React.useEffect(() => {
    if (wallet) {
      cycle.unlockWallet((window as any).ethereum, wallet);
    }
  }, [wallet]);

  return width < 780 ? (
    <Wrapper>
      <Menu
        right
        styles={{
          ...styles,
          bmBurgerButton: {
            ...styles.bmBurgerButton,
            right: width > 500 ? 230 : 180,
          },
        }}
      >
        <NavItem href="/staking">Staking(BSC)</NavItem>
        <NavItem href="/staking-eth">Staking(ETH)</NavItem>
        <NavItem href="/vesting">Claim dART</NavItem>
      </Menu>
      <WalletConnectButton />
    </Wrapper>
  ) : (
    <Wrapper>
      <NavItem href="/staking">Staking(BSC)</NavItem>
      <NavItem href="/staking-eth">Staking(ETH)</NavItem>
      <NavItem href="/vesting">Claim dART</NavItem>
      <WalletConnectButton />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => (p.role === 'active' ? p.theme.primary : p.theme.text)};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
