import dART from 'contracts/dART';
import { formatEther } from 'ethers/lib/utils';
import { useCallback, useState } from 'react';
import useCheckTransaction from './useCheckTransaction';
import usePollar from './usePollar';
import useWallet from './useWallet';

export type VestingSchedule = {
  totalAmount: number;
  amountWithdrawn: number;
};

export function useSeedVestingSchedule() {
  const [vestingSchedule, setVestingSchedule] = useState<VestingSchedule>({
    totalAmount: 0,
    amountWithdrawn: 0,
  });
  const { wallet } = useWallet();

  const fetchVestingSchedule = useCallback(async () => {
    if (wallet) {
      setVestingSchedule(await dART.getSeedVestingSchedule(wallet));
    }
  }, [wallet]);

  usePollar(fetchVestingSchedule);

  return vestingSchedule;
}

export function useSeedVested() {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getSeedVested(wallet))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useSeedWithdrawable() {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getSeedClaimable(wallet))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useVestingStartTime() {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getVestingStartTime()).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useClaimSeed() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const claimSeed = () => {
    dART
      .claimSeed()
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, claimSeed };
}
