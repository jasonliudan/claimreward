import { useEffect } from 'react';
import { checkNetwork } from 'utils/network-check';
import useWallet from './useWallet';

export const useOnCorrectChain = (page = 'claimPage') => {
  const { chainId } = useWallet();

  useEffect(() => {
    if (chainId) {
      checkNetwork(chainId, page);
    }
  }, [chainId]);
};
