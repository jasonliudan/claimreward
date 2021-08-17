import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';

export function formatTime(seconds: number): string {
  return `${Math.floor(seconds / 3600)}:${Math.floor((seconds % 3600) / 60)}:${
    seconds % 60
  }`;
}

export function formatDateTime(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export function formatBigNumber(number: BigNumber, round: number = 2) {
  return parseFloat(formatEther(number)).toFixed(round) + '';
}
