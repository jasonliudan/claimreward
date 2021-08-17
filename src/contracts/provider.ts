import { ethers } from 'ethers';

export function getDefaultProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider((window as any).ethereum);
}
