import config from 'contracts/config';
import dART from 'contracts/dART';
import { MaxUint256 } from '@ethersproject/constants';
import { formatEther } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toWei } from 'utils/ether-utils';
import useCheckTransaction from './useCheckTransaction';
import usePollar from './usePollar';
import useWallet from './useWallet';

export function useLpStakingMaturity(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getLpStakingMaturity(network)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingTotalSupply(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(formatEther(await dART.getLpStakingTotalSupply(network))),
      );
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useBNBPrice(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getBNBPrice(network)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useDARTPrice(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(await dART.getDARTPrice(network));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useBNBAmount(network = 'Bsc') {
  const [bnbAmount, setBNBAmount] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchSupply = useCallback(async () => {
    if (wallet) {
      setBNBAmount(
        parseFloat(formatEther((await dART.getLpReserves(network))[1])),
      );
    }
  }, [wallet]);

  usePollar(fetchSupply);

  return bnbAmount;
}

export function useLpTotalSupply(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getLpTotalSupply(network))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLiquidity(network = 'Bsc') {
  const bnbAmount = useBNBAmount(network);
  const bnbPrice = useBNBPrice(network);

  const liquidity = useMemo(() => bnbAmount * bnbPrice * 2, [
    bnbAmount,
    bnbPrice,
  ]);

  return liquidity;
}

export function useLpStakingTVL(network = 'Bsc') {
  const totalSupply = useLpStakingTotalSupply(network);
  const totalLpValue = useLiquidity(network);
  const lpTotalSupply = useLpTotalSupply(network);

  return useMemo(() => (totalLpValue / lpTotalSupply) * totalSupply, [
    totalLpValue,
    lpTotalSupply,
    totalSupply,
  ]);
}

export function useLpStakingPoolApy(network = 'Bsc') {
  const rewardRate = useLpStakingRewardRate(network);
  const dARTPrice = useDARTPrice(network);
  const tvl = Math.max(useLpStakingTVL(network), 1);

  return useMemo(() => ((rewardRate * 86400 * 360 * dARTPrice) / tvl) * 100, [
    rewardRate,
    dARTPrice,
    tvl,
  ]);
}

export function useLpStakeAmount(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(
          formatEther(await dART.getLpStakingBalance(wallet, network)),
        ),
      );
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingTime(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested((await dART.getLpStakingTime(wallet, network)).toNumber());
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingAccumulatedRewards(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(parseFloat(formatEther(await dART.getEarned(wallet, network))));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingRewardRate(network = 'Bsc') {
  const [vested, setVested] = useState<number>(0);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(
        parseFloat(formatEther(await dART.getLpStakingRewardRate(network))),
      );
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingRewardsWithdrawable(network = 'Bsc') {
  const [vested, setVested] = useState<boolean>(false);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(await dART.getLpStakingRewardsWithdrawable(wallet, network));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useLpStakingPoolOpen(network = 'Bsc') {
  const [vested, setVested] = useState<boolean>(true);
  const { wallet } = useWallet();

  const fetchVested = useCallback(async () => {
    if (wallet) {
      setVested(!(await dART.getLpStakingPaused(network)));
    }
  }, [wallet]);

  usePollar(fetchVested);

  return vested;
}

export function useStakeLp() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const stakeCallback = (amount: string, network = 'Bsc') => {
    dART
      .stakeLP(toWei(amount), network)
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

export function useUnstakeLp() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const unStakeCallback = (amount: string, network = 'Bsc') => {
    dART
      .unStakeLP(toWei(amount), network)
      .then(transaction => {
        startCheck(transaction);
      })
      .catch(e => {
        window.alert(e.stack);
        stopCheck();
      });
  };

  return { loading, unStakeCallback };
}

export function useLpStakingClaimRewards() {
  const { loading, startCheck, stopCheck } = useCheckTransaction();

  const claimCallback = (network = 'Bsc') => {
    dART
      .claimLpStakingRewards(network)
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

export function useLPBalance(network = 'Bsc') {
  const [balance, setBalance] = useState('0');
  const { wallet } = useWallet();

  const fetchDARTBalance = useCallback(async () => {
    if (wallet) {
      setBalance(formatEther(await dART.getLPBalance(wallet, network)));
    }
  }, [wallet]);

  usePollar(fetchDARTBalance);

  return balance;
}

export function useLpAllowance(spender: string, network = 'Bsc') {
  const [allowance, setAllowance] = useState('0');
  const { wallet } = useWallet();

  const fetchAllowance = useCallback(async () => {
    if (wallet) {
      setAllowance(
        formatEther(await dART.getLPTokenAllowance(wallet, spender, network)),
      );
    }
  }, [wallet]);

  usePollar(fetchAllowance);

  return allowance;
}

export function useLpApprove(
  amount: string,
  spender = config.deployments.LPStaking.addressBsc,
  network = 'Bsc',
) {
  const { loading, startCheck, stopCheck } = useCheckTransaction();
  const [approved, setApproved] = useState(false);

  const allowance = useLpAllowance(spender, network);

  useEffect(() => {
    if (parseFloat(allowance) > parseFloat(amount)) {
      setApproved(true);
    }
  }, [amount, allowance]);

  const approveCallback = useCallback(
    (network = 'Bsc') => {
      dART
        .approveLP(spender, MaxUint256, network)
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
