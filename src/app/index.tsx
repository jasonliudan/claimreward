/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { useTranslation } from 'react-i18next';

import CustomBtn from './components/CustomBtn';
import { Logo } from './components/NavBar/Logo';
import useWallet from 'hooks/useWallet';
import { useClaim, useJPOPBalance, useWithdrawableETH } from 'hooks/jpop';
import jpop from 'contracts/jpop'

const circleStyle = {
  fontSize: 36,
  height: 80,
  width: 80,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  boxShadow: "#C8c9dE 4px 4px 8px inset, #E7F4FF -6px -6px 12px inset",
  borderRadius: 40,
  margin: "0px auto 16px",
}

export function App() {
  const { i18n } = useTranslation();

  const { wallet, connect } = useWallet();
  const balance = useJPOPBalance();
  const withdrawableEth = useWithdrawableETH();
  const { claimCallback } = useClaim();

  const formattedWallet = wallet
    ? wallet.slice(0, 6) + '...' + wallet.slice(-4)
    : '';

  React.useEffect(() => {
    if (wallet) {
      jpop.unlockWallet((window as any).ethereum, wallet);
    }
  }, [wallet]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="JPOP REWARD"
        htmlAttributes={{ lang: i18n.language }}
      ></Helmet>
      <div style={{ display: 'flex', paddingLeft: '30px', paddingRight: '30px', justifyContent: 'space-between' }}>
        <Logo></Logo>
        <CustomBtn onClick={connect} text={formattedWallet || "Connect"} disabled={false}></CustomBtn>
      </div>
      <div style={{ width: '100%', alignItems: 'center', display: 'flex', padding: '100px', flexDirection: 'column' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
          {`Hold $FLOFE and Earn $ETH`}
        </div>
        <div style={{
          marginTop: '50px', flexDirection: 'row',
          borderRadius: '20px',
          padding: '50px 60px',
          border: `2px solid white`,
        }}>
          <div style={{ display: 'flex' }}>
            <div style={circleStyle}>
              <img style={{ height: '50px' }} src="images/logo.svg" />
            </div>
            <div style={{ width: '70px' }}></div>
            <div style={circleStyle}>
              <img style={{ height: '50px' }} src="images/eth.png" />
            </div>

          </div>
          <div style={{ marginTop: '70px', marginBottom: '70px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'white', marginBottom: '2px', fontSize: '24px', textAlign: 'center' }}>
              {parseFloat(balance).toFixed(2)}
            </div>
            <div style={{ marginBottom: '10px', color: 'gray', textAlign: 'center' }}>
              Hold Token Amount
            </div>

            <div style={{ color: 'white', marginBottom: '2px', fontSize: '24px', textAlign: 'center', marginTop: '20px' }}>
              {parseFloat(withdrawableEth).toFixed(6)}
            </div>
            <div style={{ marginBottom: '10px', color: 'gray', textAlign: 'center' }}>
              Reward ETH Amount
            </div>
          </div>
          <div style={{ justifyContent: 'center', display: 'flex' }} >
            <CustomBtn onClick={claimCallback} text="Claim" disabled={withdrawableEth === "0.0" || formattedWallet === ""}></CustomBtn>
          </div>
        </div>
      </div>
      <GlobalStyle />
    </BrowserRouter>
  );
}
