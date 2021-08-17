import { formatEther } from '@ethersproject/units';
import { MaxUint256 } from '@ethersproject/constants';
import config from 'contracts/config';
import jpop from 'contracts/jpop';
import { useCallback, useEffect, useState } from 'react';
import usePollar from './usePollar';
import useWallet from './useWallet';
import useCheckTransaction from './useCheckTransaction';

export function useJPOPBalance() {
  const [balance, setBalance] = useState('0');
  const { wallet } = useWallet();

  const fetchJPOPBalance = useCallback(async () => {
    if (wallet) {
      setBalance(formatEther(await jpop.getJPOPBalance(wallet)));
    }
  }, [wallet]);

  usePollar(fetchJPOPBalance);

  return balance;
}

export function useWithdrawableETH() {
  const [balance, setBalance] = useState('0');
  const { wallet } = useWallet();

  const fetchJPOPBalance = useCallback(async () => {
    if (wallet) {
      setBalance(formatEther(await jpop.getWithdrawableEth(wallet)));
    }
  }, [wallet]);

  usePollar(fetchJPOPBalance);

  return balance;
}

export function useClaim() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const claimCallback = () => {
    jpop
      .claimETH()
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, claimCallback };
}
