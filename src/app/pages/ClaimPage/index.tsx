import * as React from 'react';
import styled from 'styled-components/macro';
import { PageWrapper } from 'app/components/PageWrapper';
import { EmptyText, FilledText, PageTitle } from 'app/components/Typography';
import ClaimCard from './components/ClaimCard';
import {
  useSeedVestingSchedule,
  useSeedVested,
  useVestingStartTime,
  useClaimSeed,
} from 'hooks/seedVesting';
import { useOnCorrectChain } from 'hooks/useOnCorrectChain';
import {
  useClaimPrivate,
  usePrivateVested,
  usePrivateVestingSchedule,
} from 'hooks/privateVesting';

const PoolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
`;

export function ClaimPage() {
  useOnCorrectChain();

  const {
    totalAmount: seedTotal,
    amountWithdrawn: seedClaimed,
  } = useSeedVestingSchedule();
  const seedClaimable = useSeedVested() - seedClaimed;
  const { claimSeed } = useClaimSeed();

  const {
    totalAmount: privateTotal,
    amountWithdrawn: privateClaimed,
  } = usePrivateVestingSchedule();
  const privateClaimable = usePrivateVested() - privateClaimed;
  const { claimPrivate } = useClaimPrivate();

  const elapsed = Math.floor(
    (Date.now() / 1000 - useVestingStartTime()) / 86400,
  );

  const claims = [
    {
      total: seedTotal,
      claimed: seedClaimed,
      claimable: seedClaimable,
      title: 'Seed',
      elapsed: elapsed,
      claim: claimSeed,
    },
    {
      total: privateTotal,
      claimed: privateClaimed,
      claimable: privateClaimable,
      title: 'Private',
      elapsed: elapsed,
      claim: claimPrivate,
    },
  ];

  return (
    <>
      <PageWrapper>
        <PageTitle>
          <EmptyText>Claim </EmptyText>
          <FilledText>Vested </FilledText>
          <EmptyText>dART </EmptyText>
          <FilledText>Tokens</FilledText>
        </PageTitle>
        <PoolsContainer>
          {claims.map((pool, index) => (
            <ClaimCard {...pool} cardIndex={index} />
          ))}
        </PoolsContainer>
      </PageWrapper>
    </>
  );
}
