import useWallet from 'hooks/useWallet';
import React from 'react';
import styled from 'styled-components/macro';
import { checkNetwork } from 'utils/network-check';

const PoolCardWrapper = styled.div`
  border: ${p => `1px solid ${p.theme.secondary}`};
  border-radius: 10px;
  width: calc(50% - 20px);
  margin-right: ${p => ((p.tabIndex || 0) % 2 === 1 ? '40px' : '0')};
  overflow: hidden;

  @media (max-width: 924px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const PoolCardHeader = styled.div`
  background: ${p => p.theme.secondary};
  height: 80px;
  line-height: 80px;
  color: ${p => p.theme.background};
  padding: 0 30px;
  font-size: 22px;
  font-weight: 800;
`;

const PoolCardContent = styled.div`
  background: transparent;
  padding: 30px 0;
  color: white;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: ${p => p.theme.secondary};
  opacity: 0.1;
`;

const PoolCardContentItem = styled.div`
  padding: 0 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  background: ${p => p.theme.secondary};
  color: black;
  height: 40px;
  padding: 0 30px;
  line-height: 0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  user-select: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

type Props = {
  total: number;
  claimed: number;
  claimable: number;
  title: string;
  elapsed: number;
  cardIndex: number;
  claim: () => void;
};

export default function ClaimCard({
  total,
  claimed,
  claimable,
  title,
  elapsed,
  cardIndex,
  claim,
}: Props) {
  const { wallet, chainId } = useWallet();

  return (
    <PoolCardWrapper tabIndex={cardIndex + 1}>
      <PoolCardHeader>{title} dART Claim</PoolCardHeader>
      <PoolCardContent>
        <PoolCardContentItem>
          <div>Total Purchased</div>
          <div>{wallet ? total : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Claimed</div>
          <div>{wallet ? claimed : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Claimable</div>
          <div>{wallet ? claimable : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Pending</div>
          <div>{wallet ? total - claimed : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Vesting Period</div>
          <div>{wallet ? '270 days' : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Elapsed Period</div>
          <div>{wallet ? `${elapsed} days` : '-'}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Remaining Period</div>
          <div>{wallet ? `${270 - elapsed} days` : '-'}</div>
        </PoolCardContentItem>

        <ButtonContainer>
          <StyledButton
            disabled={!wallet || !claimable}
            onClick={() => {
              if (checkNetwork(chainId)) {
                claim();
              }
            }}
          >
            Claim
          </StyledButton>
        </ButtonContainer>
      </PoolCardContent>
    </PoolCardWrapper>
  );
}
