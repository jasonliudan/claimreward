import config from 'contracts/config';
import { useEffect } from 'react';

export default function usePollar(
  callback: () => void,
  refreshInterval = config.refreshInterval,
) {
  useEffect(() => {
    callback();
    const interval = setInterval(callback, refreshInterval);
    return () => clearInterval(interval);
  }, [callback]);
}
