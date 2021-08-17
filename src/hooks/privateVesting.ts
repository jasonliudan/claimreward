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

export function usePrivateVestingSchedule() {
  const [vestingSchedule, setVestingSchedule] = useState<VestingSchedule>({
    totalAmount: 0,
    amountWithdrawn: 0,
  });
  const { wallet } = useWallet();

  const fetchVestingSchedule = useCallback(async () => {
    if (wallet) {
      setVestingSchedule(await dART.getPrivateVestingSchedule(wallet));
    }
  }, [wallet]);

  usePollar(fetchVestingSchedule);

  return vestingSchedule;
}

export function usePrivateVested() {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getPrivateVested(wallet))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function usePrivateWithdrawable() {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(formatEther(await dART.getPrivateClaimable(wallet))),
      );
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

export function useClaimPrivate() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const claimPrivate = () => {
    dART
      .claimPrivate()
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, claimPrivate };
}
