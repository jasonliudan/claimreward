import { TransactionResponse } from '@ethersproject/providers';
import { getDefaultProvider } from 'contracts/provider';
import { useRef, useState } from 'react';

export default function useCheckTransaction() {
  const interval = useRef<number>();
  const [loading, setLoading] = useState(false);

  const stopCheck = () => {
    setLoading(false);
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  const startCheck = (
    transaction: TransactionResponse,
    callback?: () => void,
  ) => {
    setLoading(true);

    interval.current = setInterval(() => {
      getDefaultProvider()
        .getTransactionReceipt(transaction.hash)
        .then(receipt => {
          if (receipt) {
            stopCheck();
            if (callback) {
              callback();
            }
          }
        });
    }, 3000);
  };

  return { loading, startCheck, stopCheck };
}
