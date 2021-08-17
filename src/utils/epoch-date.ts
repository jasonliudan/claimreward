import { BigNumber } from '@ethersproject/bignumber';

export default function getEpochDate(
  epoch: number,
  startTime: BigNumber,
  period: BigNumber,
): Date {
  return new Date(startTime.add(period.mul(epoch)).toNumber() * 1000);
}
