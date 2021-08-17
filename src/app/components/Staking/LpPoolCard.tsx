import useWallet from 'hooks/useWallet';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { checkNetwork } from 'utils/network-check';
import LpStakeModal from './LpStakeModal';
import LpClaimModal from './LpClaimModal';

const PoolCardWrapper = styled.div`
  border: ${p => `1px solid ${p.theme.secondary}`};
  border-radius: 10px;
  width: calc(50% - 20px);
  margin-right: ${p => ((p.tabIndex || 0) % 2 === 1 ? '40px' : '0')};
  overflow: hidden;
  margin-bottom: 20px;

  @media (max-width: 924px) {
    width: 100%;
    margin-right: 0;
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

const LpButton = styled.a`
  align-items: center;
  display: flex;
  justify-content: space-around;
  text-decoration: underline;
  margin-top: 10px;
  color: ${p => p.theme.primary};
  cursor: pointer;
`;

type Props = {
  apy: number;
  maturity: number;
  status: string;
  yourStake: number;
  reward: number;
  accumulatedReward: number;
  remaining: number;
  tvl: number;
  title: string;
  network?: string;
};

export default function LpPoolCard({
  apy,
  maturity,
  status,
  yourStake,
  reward,
  accumulatedReward,
  remaining,
  tvl,
  title,
  network = 'Bsc',
}: Props) {
  const { wallet, chainId } = useWallet();

  const [isStakeOpen, setIsStakeOpen] = useState(false);
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);

  return (
    <PoolCardWrapper>
      <PoolCardHeader>{title}</PoolCardHeader>
      <PoolCardContent>
        <PoolCardContentItem>
          <div>APY</div>
          <div>{apy.toFixed(2)}%</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Maturity</div>
          <div>{Math.ceil(maturity / 86400)} days</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>TVL</div>
          <div>${tvl.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Pool status</div>
          <div>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
        </PoolCardContentItem>
        <Line />
        <PoolCardContentItem>
          <div>Your Stake</div>
          <div>{yourStake} LP</div>
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
          <div>{Math.ceil(remaining / 86400)} days</div>
        </PoolCardContentItem>

        <LpButton
          target="_blank"
          href={
            network === 'Bsc'
              ? 'https://exchange.pancakeswap.finance/#/add/BNB/0x5a4623F305A8d7904ED68638AF3B4328678edDBF'
              : 'https://app.uniswap.org/#/add/ETH/0x5a4623F305A8d7904ED68638AF3B4328678edDBF'
          }
        >
          {network === 'Bsc'
            ? 'Get dART-BNB PCS LP Token'
            : 'Get dART-ETH UNI LP Token'}
        </LpButton>

        <ButtonContainer>
          <StyledButton
            disabled={!wallet || status === 'closed'}
            onClick={() => {
              if (
                checkNetwork(
                  chainId,
                  network === 'Bsc' ? 'stakingPage' : 'ethStakingPage',
                )
              ) {
                setIsStakeOpen(true);
              }
            }}
          >
            Stake
          </StyledButton>
          <StyledButton
            disabled={!wallet || !yourStake}
            onClick={() => {
              if (
                checkNetwork(
                  chainId,
                  network === 'Bsc' ? 'stakingPage' : 'ethStakingPage',
                )
              ) {
                setIsUnstakeOpen(true);
              }
            }}
          >
            Unstake
          </StyledButton>
          <StyledButton
            // disabled={!wallet || !reward}
            onClick={() => {
              if (
                checkNetwork(
                  chainId,
                  network === 'Bsc' ? 'stakingPage' : 'ethStakingPage',
                )
              ) {
                setIsClaimOpen(true);
              }
            }}
          >
            Claim
          </StyledButton>
        </ButtonContainer>
      </PoolCardContent>

      {isStakeOpen && (
        <LpStakeModal
          isOpen={isStakeOpen}
          closeModal={() => setIsStakeOpen(false)}
          network={network}
        />
      )}
      {isUnstakeOpen && (
        <LpStakeModal
          isOpen={isUnstakeOpen}
          closeModal={() => setIsUnstakeOpen(false)}
          isStake={false}
          network={network}
        />
      )}
      {isClaimOpen && (
        <LpClaimModal
          isOpen={isClaimOpen}
          closeModal={() => setIsClaimOpen(false)}
          network={network}
        />
      )}
    </PoolCardWrapper>
  );
}
