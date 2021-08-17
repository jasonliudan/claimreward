import { formatEther } from '@ethersproject/units';
import { MaxUint256 } from '@ethersproject/constants';
import config from 'contracts/config';
import dART from 'contracts/dART';
import { useCallback, useEffect, useState } from 'react';
import usePollar from './usePollar';
import useWallet from './useWallet';
import useCheckTransaction from './useCheckTransaction';

export function useDARTBalance(network = 'Bsc') {
  const [balance, setBalance] = useState('0');
  const { wallet } = useWallet();

  const fetchDARTBalance = useCallback(async () => {
    if (wallet) {
      setBalance(formatEther(await dART.getDARTBalance(wallet, network)));
    }
  }, [wallet]);

  usePollar(fetchDARTBalance);

  return balance;
}

export function useDARTAllowance(spender: string, network = 'Bsc') {
  const [allowance, setAllowance] = useState('0');
  const { wallet } = useWallet();

  const fetchAllowance = useCallback(async () => {
    if (wallet) {
      setAllowance(
        formatEther(await dART.getDARTTokenAllowance(wallet, spender, network)),
      );
    }
  }, [wallet]);

  usePollar(fetchAllowance);

  return allowance;
}

export function useDARTApprove(
  amount: string,
  spender = config.deployments.DARTStaking.pool1Address,
) {
  const { loading, startCheck, stopCheck } = useCheckTransaction();
  const [approved, setApproved] = useState(false);

  const allowance = useDARTAllowance(spender);

  useEffect(() => {
    if (parseFloat(allowance) > parseFloat(amount)) {
      setApproved(true);
    }
  }, [amount, allowance]);

  const approveCallback = useCallback(
    (network = 'Bsc') => {
      dART
        .approveDART(spender, MaxUint256, network)
        .then(transaction => {
          startCheck(transaction, () => setApproved(true));
        })
        .catch(e => {
          window.alert(e.stack);
          stopCheck();
        });
    },
    [startCheck, stopCheck],
  );

  return { approved, pending: loading, approveCallback };
}
