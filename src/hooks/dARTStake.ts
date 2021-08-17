import dART from 'contracts/dART';
import { formatEther } from 'ethers/lib/utils';
import { useCallback, useMemo, useState } from 'react';
import { toWei } from 'utils/ether-utils';
import useCheckTransaction from './useCheckTransaction';
import usePollar from './usePollar';
import useWallet from './useWallet';

export function usePoolLaunchTime(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(await (await dART.getPoolLaunchTime(poolIndex)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function usePoolClosingTime(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(await (await dART.getPoolClosingTime(poolIndex)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useMaturityDays(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getMaturityDays(poolIndex)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function usePoolSize(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getPoolSize(poolIndex))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function usePoolApy(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getPoolApy(poolIndex)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useTotalStake(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getTotalStake(poolIndex))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useStakeAmount(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(formatEther(await dART.getStake(poolIndex, wallet))),
      );
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useStakeTime(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getStakeTime(poolIndex, wallet)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useStakeRewards(poolIndex = 1) {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(formatEther(await dART.getRewards(poolIndex, wallet))),
      );
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useAccumulatedRewards(poolIndex = 1) {
  const stake = useStakeAmount(poolIndex);
  const apy = usePoolApy(poolIndex);
  const stakeTime = useStakeTime(poolIndex);

  return useMemo(
    () => (stake * apy * (Date.now() / 1000 - stakeTime)) / 360 / 86400 / 100,
    [stake, apy, stakeTime],
  );
}

export function usePoolOpen(poolIndex = 1) {
  const totalStaked = useTotalStake(poolIndex);
  const poolSize = usePoolSize(poolIndex);
  const closingTime = usePoolClosingTime(poolIndex);
  const launchTime = usePoolLaunchTime(poolIndex);

  return useMemo(() => {
    return (
      poolSize > totalStaked &&
      Date.now() / 1000 > launchTime &&
      Date.now() / 1000 < closingTime
    );
  }, [totalStaked, poolSize, closingTime, launchTime]);
}

export function useStake(poolIndex = 1) {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const stakeCallback = (amount: string) => {
    dART
      .stake(poolIndex, toWei(amount))
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, stakeCallback };
}

export function useWithdraw(poolIndex = 1) {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const withdrawCallback = () => {
    dART
      .withdraw(poolIndex)
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, withdrawCallback };
}
