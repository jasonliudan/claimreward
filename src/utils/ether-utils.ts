import { parseUnits } from 'ethers/lib/utils';

export const toWei = (arg: string) => parseUnits(arg).toHexString();
