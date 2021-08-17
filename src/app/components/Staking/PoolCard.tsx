import useWallet from 'hooks/useWallet';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { checkNetwork } from 'utils/network-check';
import StakeModal from './StakeModal';

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
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  apy: number;
  maturity: number;
  size: number;
  status: string;
  yourStake: number;
  reward: number;
  accumulatedReward: number;
  remaining: number;
  poolIndex: number;
  totalStake: number;
  title: string;
};

export default function PoolCard({
  apy,
  maturity,
  size,
  status,
  yourStake,
  reward,
  accumulatedReward,
  remaining,
  poolIndex,
  totalStake,
  title,
}: Props) {
  const { wallet, chainId } = useWallet();

  const [isStakeOpen, setIsStakeOpen] = useState(false);
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);

  return (
    <PoolCardWrapper tabIndex={poolIndex}>
      <PoolCardHeader>{title}</PoolCardHeader>
      <PoolCardContent>
        <PoolCardContentItem>
          <div>APY</div>
          <div>{apy}%</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Maturity</div>
          <div>{maturity} days</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Pool size</div>
          <div>{size} dART</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Total Stake</div>
          <div>{totalStake.toFixed(2)} dART</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Pool status</div>
          <div>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Your Stake</div>
          <div>{yourStake} dART</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>dART accumulated rewards</div>
          <div>{accumulatedReward.toFixed(2)} dART</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>dART claimable rewards</div>
          <div>{reward} dART</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Remaining Until Maturity</div>
          <div>{remaining} days</div>
        </PoolCardContentItem>

        <ButtonContainer>
          <StyledButton
            disabled={!wallet || status === 'closed'}
            onClick={() => {
              if (checkNetwork(chainId, 'stakingPage')) {
                setIsStakeOpen(true);
              }
            }}
          >
            Stake
          </StyledButton>
          <StyledButton
            disabled={!wallet || !yourStake}
            onClick={() => {
              if (checkNetwork(chainId, 'stakingPage')) {
                setIsUnstakeOpen(true);
              }
            }}
          >
            Unstake
          </StyledButton>
        </ButtonContainer>
      </PoolCardContent>

      {isStakeOpen && (
        <StakeModal
          isOpen={isStakeOpen}
          closeModal={() => setIsStakeOpen(false)}
          poolIndex={poolIndex}
        />
      )}
      {isUnstakeOpen && (
        <StakeModal
          isOpen={isUnstakeOpen}
          closeModal={() => setIsUnstakeOpen(false)}
          isStake={false}
          poolIndex={poolIndex}
        />
      )}
    </PoolCardWrapper>
  );
}
