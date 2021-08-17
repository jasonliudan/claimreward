import { BigNumber, Contract, Overrides, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import { getDefaultProvider } from './provider';
import config from './config';
import { VestingSchedule } from '../hooks/seedVesting';
import { formatEther } from '@ethersproject/units';
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';

class DART {
  seedVesting: Contract = new Contract(
    config.deployments.Vesting.seedAddress,
    config.deployments.Vesting.abi,
  );

  privateVesting: Contract = new Contract(
    config.deployments.Vesting.privateAddress,
    config.deployments.Vesting.abi,
  );

  staking1: Contract = new Contract(
    config.deployments.DARTStaking.pool1Address,
    config.deployments.DARTStaking.abi,
  );

  staking2: Contract = new Contract(
    config.deployments.DARTStaking.pool2Address,
    config.deployments.DARTStaking.abi,
  );

  dARTErc: Contract = new Contract(
    config.deployments.dARTToken.addressErc,
    config.deployments.dARTToken.abi,
  );

  dARTBsc: Contract = new Contract(
    config.deployments.dARTToken.addressBsc,
    config.deployments.dARTToken.abi,
  );

  lpStakingErc: Contract = new Contract(
    config.deployments.LPStaking.addressErc,
    config.deployments.LPStaking.abi,
  );

  lpStakingBsc: Contract = new Contract(
    config.deployments.LPStaking.addressBsc,
    config.deployments.LPStaking.abi,
  );

  lpErc: Contract = new Contract(
    config.deployments.LP.addressErc,
    config.deployments.LP.abi,
  );

  lpBsc: Contract = new Contract(
    config.deployments.LP.addressBsc,
    config.deployments.LP.abi,
  );

  swapRouterErc: Contract = new Contract(
    config.deployments.swapRouter.addressErc,
    IUniswapV2Router02ABI,
  );

  swapRouterBsc: Contract = new Contract(
    config.deployments.swapRouter.addressBsc,
    IUniswapV2Router02ABI,
  );

  unlockWallet(provider: any, account: string) {
    this.seedVesting = new Contract(
      config.deployments.Vesting.seedAddress,
      config.deployments.Vesting.abi,
      getDefaultProvider(),
    );

    this.privateVesting = new Contract(
      config.deployments.Vesting.privateAddress,
      config.deployments.Vesting.abi,
      getDefaultProvider(),
    );

    this.staking1 = new Contract(
      config.deployments.DARTStaking.pool1Address,
      config.deployments.DARTStaking.abi,
      getDefaultProvider(),
    );

    this.staking2 = new Contract(
      config.deployments.DARTStaking.pool2Address,
      config.deployments.DARTStaking.abi,
      getDefaultProvider(),
    );

    this.dARTErc = new Contract(
      config.deployments.dARTToken.addressErc,
      config.deployments.dARTToken.abi,
      getDefaultProvider(),
    );

    this.lpStakingErc = new Contract(
      config.deployments.LPStaking.addressErc,
      config.deployments.LPStaking.abi,
      getDefaultProvider(),
    );

    this.lpStakingBsc = new Contract(
      config.deployments.LPStaking.addressBsc,
      config.deployments.LPStaking.abi,
      getDefaultProvider(),
    );

    this.lpErc = new Contract(
      config.deployments.LP.addressErc,
      config.deployments.LP.abi,
      getDefaultProvider(),
    );

    this.lpBsc = new Contract(
      config.deployments.LP.addressBsc,
      config.deployments.LP.abi,
      getDefaultProvider(),
    );

    this.swapRouterErc = new Contract(
      config.deployments.swapRouter.addressErc,
      IUniswapV2Router02ABI,
      getDefaultProvider(),
    );

    this.swapRouterBsc = new Contract(
      config.deployments.swapRouter.addressBsc,
      IUniswapV2Router02ABI,
      getDefaultProvider(),
    );

    const newProvider = new ethers.providers.Web3Provider(provider);

    const signer = newProvider.getSigner(0);
    this.seedVesting = this.seedVesting.connect(signer);
    this.privateVesting = this.privateVesting.connect(signer);
    this.staking1 = this.staking1.connect(signer);
    this.staking2 = this.staking2.connect(signer);
    this.dARTErc = this.dARTErc.connect(signer);
    this.dARTBsc = this.dARTBsc.connect(signer);
    this.lpStakingErc = this.lpStakingErc.connect(signer);
    this.lpStakingBsc = this.lpStakingBsc.connect(signer);
    this.lpErc = this.lpErc.connect(signer);
    this.lpBsc = this.lpBsc.connect(signer);
    this.swapRouterErc = this.swapRouterErc.connect(signer);
    this.swapRouterBsc = this.swapRouterBsc.connect(signer);

    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  async getBNBPrice(network = 'Bsc'): Promise<BigNumber> {
    return (
      await this[`swapRouter${network}`].getAmountsOut(1, [
        config.deployments.WBNB[`address${network}`],
        config.deployments.BUSD[`address${network}`],
      ])
    )[1];
  }

  async getdARTPerBNB(network = 'Bsc'): Promise<BigNumber> {
    return (
      await this[`swapRouter${network}`].getAmountsOut(1, [
        config.deployments.WBNB[`address${network}`],
        config.deployments.dARTToken[`address${network}`],
      ])
    )[1];
  }

  async getDARTPrice(network = 'Bsc'): Promise<number> {
    return (
      (await this.getBNBPrice(network)).toNumber() /
      (await this.getdARTPerBNB(network)).toNumber()
    );
  }

  async getLpReserves(network = 'Bsc'): Promise<BigNumber> {
    return await this[`lp${network}`].getReserves();
  }

  async getLpTotalSupply(network = 'Bsc'): Promise<BigNumber> {
    return await this[`lp${network}`].totalSupply();
  }

  async getVestingStartTime(): Promise<BigNumber> {
    return await this.seedVesting.startTime();
  }

  async getSeedVested(address: string): Promise<BigNumber> {
    return await this.seedVesting.vested(address);
  }

  async getPrivateVested(address: string): Promise<BigNumber> {
    return await this.privateVesting.vested(address);
  }

  async getSeedClaimable(address: string): Promise<BigNumber> {
    return await this.seedVesting.withdrawable(address);
  }

  async getPrivateClaimable(address: string): Promise<BigNumber> {
    return await this.privateVesting.withdrawable(address);
  }

  async getSeedVestingSchedule(address: string): Promise<VestingSchedule> {
    const resp = await this.seedVesting.recipients(address);
    console.log('seed resp', resp);
    return {
      totalAmount: parseFloat(formatEther(resp.totalAmount)),
      amountWithdrawn: parseFloat(formatEther(resp.amountWithdrawn)),
    };
  }

  async getPrivateVestingSchedule(address: string): Promise<VestingSchedule> {
    const resp = await this.privateVesting.recipients(address);
    return {
      totalAmount: parseFloat(formatEther(resp.totalAmount)),
      amountWithdrawn: parseFloat(formatEther(resp.amountWithdrawn)),
    };
  }

  async claimSeed(): Promise<TransactionResponse> {
    const gas = await this.seedVesting.estimateGas.withdraw();
    return await this.seedVesting.withdraw({
      ...this.gasOptions(gas),
    });
  }

  async claimPrivate(): Promise<TransactionResponse> {
    const gas = await this.privateVesting.estimateGas.withdraw();
    return await this.privateVesting.withdraw({
      ...this.gasOptions(gas),
    });
  }

  async getPoolLaunchTime(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].launchTime();
  }

  async getPoolClosingTime(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].closingTime();
  }

  async getMaturityDays(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].maturityDays();
  }

  async getPoolApy(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].poolApy();
  }

  async getPoolSize(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].poolSize();
  }

  async getStake(poolIndex: number, address: string): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].stakeOf(address);
  }

  async getStakeTime(poolIndex: number, address: string): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].stakeTimeOf(address);
  }

  async getTotalStake(poolIndex: number): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].stakedTotal();
  }

  async getRewards(poolIndex: number, address: string): Promise<BigNumber> {
    return await this[`staking${poolIndex}`].getRewards(address);
  }

  async stake(poolIndex: number, amount: string): Promise<TransactionResponse> {
    const gas = await this[`staking${poolIndex}`].estimateGas.stake(amount);
    return await this[`staking${poolIndex}`].stake(amount, {
      ...this.gasOptions(gas),
    });
  }

  async withdraw(poolIndex: number): Promise<TransactionResponse> {
    const gas = await this[`staking${poolIndex}`].estimateGas.withdraw();
    return await this[`staking${poolIndex}`].withdraw({
      ...this.gasOptions(gas),
    });
  }

  async getDARTBalance(address: string, network = 'Bsc'): Promise<BigNumber> {
    return await this[`dART${network}`].balanceOf(address);
  }

  async getLPBalance(address: string, network = 'Bsc'): Promise<BigNumber> {
    return await this[`lp${network}`].balanceOf(address);
  }

  async getDARTTokenAllowance(
    owner: string,
    spender: string,
    network = 'Bsc',
  ): Promise<BigNumber> {
    return await this[`dART${network}`].allowance(owner, spender);
  }

  async approveDART(
    spender: string,
    amount: BigNumber,
    network = 'Bsc',
  ): Promise<TransactionResponse> {
    const gas = await this[`dART${network}`].estimateGas.approve(
      spender,
      amount,
    );
    return await this[`dART${network}`].approve(
      spender,
      amount,
      this.gasOptions(gas),
    );
  }

  async getLPTokenAllowance(
    owner: string,
    spender: string,
    network = 'Bsc',
  ): Promise<BigNumber> {
    return await this[`lp${network}`].allowance(owner, spender);
  }

  async approveLP(
    spender: string,
    amount: BigNumber,
    network = 'Bsc',
  ): Promise<TransactionResponse> {
    const gas = await this[`lp${network}`].estimateGas.approve(spender, amount);
    return await this[`lp${network}`].approve(
      spender,
      amount,
      this.gasOptions(gas),
    );
  }

  async getLpStakingMaturity(network = 'Bsc'): Promise<BigNumber> {
    return await this[`lpStaking${network}`].maturity();
  }

  async getLpStakingRewardRate(network = 'Bsc'): Promise<BigNumber> {
    return await this[`lpStaking${network}`].rewardRate();
  }

  async getLpStakingTotalSupply(network = 'Bsc'): Promise<BigNumber> {
    return await this[`lpStaking${network}`].totalSupply();
  }

  async getLpStakingBalance(
    account: string,
    network = 'Bsc',
  ): Promise<BigNumber> {
    return await this[`lpStaking${network}`].balanceOf(account);
  }

  async getEarned(account: string, network = 'Bsc'): Promise<BigNumber> {
    return await this[`lpStaking${network}`].earned(account);
  }

  async getLpStakingPaused(network = 'Bsc'): Promise<boolean> {
    return await this[`lpStaking${network}`].paused();
  }

  async getLpStakingTime(address: string, network = 'Bsc'): Promise<BigNumber> {
    return await this[`lpStaking${network}`].stakeTimes(address);
  }

  async getLpStakingRewardsWithdrawable(
    address: string,
    network = 'Bsc',
  ): Promise<boolean> {
    return await this[`lpStaking${network}`].rewardsWithdrawable(address);
  }

  async stakeLP(amount: string, network = 'Bsc'): Promise<TransactionResponse> {
    const gas = await this[`lpStaking${network}`].estimateGas.stake(amount);
    return await this[`lpStaking${network}`].stake(amount, {
      ...this.gasOptions(gas),
    });
  }

  async unStakeLP(
    amount: string,
    network = 'Bsc',
  ): Promise<TransactionResponse> {
    const gas = await this[`lpStaking${network}`].estimateGas.withdraw(amount);
    return await this[`lpStaking${network}`].withdraw(amount, {
      ...this.gasOptions(gas),
    });
  }

  async claimLpStakingRewards(network = 'Bsc'): Promise<TransactionResponse> {
    const gas = await this[`lpStaking${network}`].estimateGas.getReward();
    return await this[`lpStaking${network}`].getReward({
      ...this.gasOptions(gas),
    });
  }
}

const dART = new DART();

export default dART;
