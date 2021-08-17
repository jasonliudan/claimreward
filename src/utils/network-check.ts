import { ChainId } from '@uniswap/sdk';
import config from 'contracts/config';

export const checkNetwork = (chainId: ChainId, page = 'claimPage') => {
  if (!config.chainIds[page].includes(chainId)) {
    window.alert('Wrong Network.');
    return false;
  } else {
    return true;
  }
};
