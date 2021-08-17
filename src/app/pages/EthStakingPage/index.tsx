import * as React from 'react';
import styled from 'styled-components/macro';
import { PageWrapper } from 'app/components/PageWrapper';
import { EmptyText, FilledText, PageTitle } from 'app/components/Typography';
import { useOnCorrectChain } from 'hooks/useOnCorrectChain';
// import {
//   useAccumulatedRewards,
//   useMaturityDays,
//   usePoolApy,
//   usePoolOpen,
//   usePoolSize,
//   useStakeAmount,
//   useStakeRewards,
//   useStakeTime,
//   useTotalStake,
// } from 'hooks/dARTStake';
import LpPoolCard from '../../components/Staking/LpPoolCard';
import {
  useLpStakingMaturity,
  useLpStakingPoolOpen,
  useLpStakeAmount,
  useLpStakingAccumulatedRewards,
  useLpStakingRewardsWithdrawable,
  useLpStakingTime,
  useLpStakingTVL,
  useLpStakingPoolApy,
} from 'hooks/lpStake';

const PoolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
`;

export function EthStakingPage() {
  useOnCorrectChain('ethStakingPage');

  // const pool1Apy = usePoolApy(1);
  // const pool1Maturity = useMaturityDays(1);
  // const pool1Size = usePoolSize(1);
  // const pool1YourStake = useStakeAmount(1);
  // const pool1YourReward = useStakeRewards(1);
  // const isPool1Open = usePoolOpen(1);
  // const pool1TotalStaked = useTotalStake(1);
  // const pool1StakeTime = useStakeTime(1);
  // const remaining1 = pool1StakeTime + pool1Maturity * 86400 - Date.now() / 1000;
  // const pool1AccumulatedRewards = useAccumulatedRewards(1);

  // const pool2Apy = usePoolApy(2);
  // const pool2Maturity = useMaturityDays(2);
  // const pool2Size = usePoolSize(2);
  // const pool2YourStake = useStakeAmount(2);
  // const pool2YourReward = useStakeRewards(2);
  // const isPool2Open = usePoolOpen(2);
  // const pool2TotalStaked = useTotalStake(2);
  // const pool2StakeTime = useStakeTime(1);
  // const remaining2 = pool2StakeTime + pool2Maturity * 86400 - Date.now() / 1000;
  // const pool2AccumulatedRewards = useAccumulatedRewards(2);

  const lpPoolApy = useLpStakingPoolApy('Erc');
  const lpMaturity = useLpStakingMaturity('Erc');
  const lpTvl = useLpStakingTVL('Erc');
  const lpPoolOpen = useLpStakingPoolOpen('Erc');
  const lpStake = useLpStakeAmount('Erc');
  const lpAccumulatedRewards = useLpStakingAccumulatedRewards('Erc');
  const lpClaimableRewards = useLpStakingRewardsWithdrawable('Erc')
    ? lpAccumulatedRewards
    : 0;
  const lpSTakeTime = useLpStakingTime('Erc');
  const lpRemaining = Math.max(lpSTakeTime + lpMaturity - Date.now() / 1000, 0);

  // const pools = [
  //   {
  //     apy: pool1Apy,
  //     maturity: pool1Maturity,
  //     size: pool1Size,
  //     status: isPool1Open ? 'open' : 'closed',
  //     yourStake: pool1YourStake,
  //     reward: pool1YourReward,
  //     accumulatedReward: pool1AccumulatedRewards,
  //     remaining: remaining1 > 0 ? Math.ceil(remaining1 / 86400) : 0,
  //     totalStake: pool1TotalStaked,
  //     title: 'dART MOON POOL',
  //   },
  //   {
  //     apy: pool2Apy,
  //     maturity: pool2Maturity,
  //     size: pool2Size,
  //     status: isPool2Open ? 'open' : 'closed',
  //     yourStake: pool2YourStake,
  //     reward: pool2YourReward,
  //     accumulatedReward: pool2AccumulatedRewards,
  //     remaining: remaining2 > 0 ? Math.ceil(remaining2 / 86400) : 0,
  //     totalStake: pool2TotalStaked,
  //     title: 'dART COOL POOL',
  //   },
  // ];

  const lpPool = {
    apy: lpPoolApy,
    maturity: lpMaturity,
    status: lpPoolOpen ? 'open' : 'closed',
    yourStake: lpStake,
    reward: lpClaimableRewards,
    accumulatedReward: lpAccumulatedRewards,
    remaining: lpRemaining,
    tvl: lpTvl,
    title: 'dART-ETH UNI LP POOL',
  };

  return (
    <>
      <PageWrapper>
        <PageTitle>
          <EmptyText>dART </EmptyText>
          <FilledText>TOKEN </FilledText>
          <EmptyText>STAKING</EmptyText>
        </PageTitle>
        <PoolsContainer>
          <div style={{ width: '100%' }}>
            <LpPoolCard {...lpPool} network="Erc" />
          </div>
          {/* {pools.map((pool, index) => (
            <PoolCard {...pool} poolIndex={index + 1} />
          ))} */}
        </PoolsContainer>
      </PageWrapper>
    </>
  );
}
