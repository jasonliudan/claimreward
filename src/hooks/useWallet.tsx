import { useState } from 'react';
import Web3 from 'web3';
import usePollar from './usePollar';

const ethWindow = window as any;

const isMetamaskInstalled = () => typeof ethWindow.ethereum !== 'undefined';

export default function useWallet() {
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState(0);

  const setWalletAndBalance = account => {
    const web3 = new Web3(ethWindow.ethereum);

    setWallet(account || '');

    if (account) {
      web3.eth.getBalance(account, (err, balance) => {
        setBalance(web3.utils.fromWei(balance, 'ether'));
      });
    }
  };

  const connect = () => {
    if (!isMetamaskInstalled()) {
      window.alert('Non-Ethereum Browser Detected. Try MetaMask!');
    }

    ethWindow.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => setWalletAndBalance(accounts[0]));
  };

  usePollar(() => {
    if (!isMetamaskInstalled()) {
      window.alert('Non-Ethereum Browser Detected. Try MetaMask!');
    } else {
      const web3 = new Web3(ethWindow.ethereum);

      web3.eth.getAccounts().then(accounts => {
        setWalletAndBalance(accounts[0]);
      });

      web3.eth.getChainId((err, version) => {
        if (!err && version) {
          setChainId(version);
        }
      });
    }
  });

  return { wallet, balance, chainId, connect };
}
