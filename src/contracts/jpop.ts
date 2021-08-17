import { BigNumber, Contract, Overrides, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import { getDefaultProvider } from './provider';
import config from './config';
import { VestingSchedule } from '../hooks/seedVesting';
import { formatEther } from '@ethersproject/units';
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';

class JPOP {
  jpopErc: Contract = new Contract(
    config.deployments.jpopToken.address,
    config.deployments.jpopToken.abi,
  );

  unlockWallet(provider: any, account: string) {
    this.jpopErc = new Contract(
      config.deployments.jpopToken.address,
      config.deployments.jpopToken.abi,
      getDefaultProvider(),
    );

    const newProvider = new ethers.providers.Web3Provider(provider);

    const signer = newProvider.getSigner(0);
    this.jpopErc = this.jpopErc.connect(signer);

    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  async claimETH(): Promise<TransactionResponse> {
    const gas = await this.jpopErc.estimateGas.claim(false, "0");
    return await this.jpopErc.claim(false, "0", {
      ...this.gasOptions(gas),
    });
  }

  async getJPOPBalance(address: string): Promise<BigNumber> {
    return await this.jpopErc.balanceOf(address);
  }

  async getWithdrawableEth(address: string): Promise<BigNumber> {
    return await this.jpopErc.withdrawableDividendOf(address);
  }
}

const jpop = new JPOP();

export default jpop;
