import { ChainId } from '@uniswap/sdk';
import deploymentsRinkeby from './deployments/deployments.rinkeby.json';
import deploymentsMainnet from './deployments/deployments.mainnet.json';

export type Deployments = {
  [contractName: string]: {
    address?: string;
    seedAddress?: string;
    privateAddress?: string;
    pool1Address?: string;
    addressErc?: string;
    addressBsc?: string;
    abi: any[];
  };
};

export type Configuration = {
  chainIds: {
    claimPage: [number];
    stakingPage: [number];
    ethStakingPage: [number];
  };
  etherscanUrl: string;
  defaultProvider: string;
  deployments: Deployments;
  refreshInterval: number;
  gasLimitMultiplier: number;
};

const configurations: { [env: string]: Configuration } = {
  development: {
    chainIds: {
      claimPage: [ChainId.RINKEBY],
      stakingPage: [ChainId.RINKEBY],
      ethStakingPage: [ChainId.RINKEBY],
    },
    etherscanUrl: 'https://etherscan.io',
    defaultProvider:
      'https://eth-rinkeby.alchemyapi.io/v2/jV3nD-vohjNQIcRH6aSScMFGGZQwLqFF',
    deployments: deploymentsRinkeby,
    refreshInterval: 6000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainIds: {
      claimPage: [ChainId.MAINNET],
      stakingPage: [1],
      ethStakingPage: [ChainId.MAINNET],
    },
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://ethnode.steaker.capital',
    deployments: deploymentsMainnet,
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

// export default configurations[process.env.NODE_ENV || 'development'];
export default configurations.production;
