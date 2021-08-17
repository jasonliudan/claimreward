import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Modal from 'react-modal';
import config from 'contracts/config';
import { useDARTApprove, useDARTBalance } from 'hooks/dART';
import {
  useAccumulatedRewards,
  useStake,
  useStakeAmount,
  useStakeRewards,
  useWithdraw,
} from 'hooks/dARTStake';

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  margin-top: 20px;
`;

const Warning = styled.div`
  color: red;
  margin-top: 10px;
`;

type Props = {
  isStake?: boolean;
  poolIndex?: number;
  isOpen: boolean;
  closeModal: () => void;
};

export default function StakeModal({
  isOpen,
  closeModal,
  isStake = true,
  poolIndex = 1,
}: Props) {
  const dARTBalance = useDARTBalance();
  const stakeBalance = useStakeAmount(poolIndex);
  const reward = useStakeRewards(poolIndex);
  const accumulatedRewards = useAccumulatedRewards(poolIndex);

  const { stakeCallback } = useStake(poolIndex);
  const { withdrawCallback } = useWithdraw(poolIndex);

  const [amount, setAmount] = useState('0');

  const { approved, approveCallback } = useDARTApprove(
    amount,
    config.deployments.DARTStaking[`pool${poolIndex}Address`],
  );

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '360px',
        },
      }}
    >
      {isStake ? 'dART' : 'Staked'} Balance:{' '}
      {isStake ? dARTBalance : stakeBalance}
      <br />
      {!isStake && (
        <div>dART accumulated rewards: {accumulatedRewards.toFixed(2)}</div>
      )}
      {!isStake && <div>dART claimable rewards: {reward}</div>}
      <div>
        {isStake && (
          <StyledInput
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        )}
      </div>
      {!isStake && !reward && (
        <Warning>
          *Warning: Unstaking before maturity period will result to lose all
          your accumulated rewards.
        </Warning>
      )}
      <ButtonContainer>
        <StyledButton onClick={closeModal}>Cancel</StyledButton>
        <StyledButton
          onClick={() => {
            if (isStake) {
              if (approved) {
                stakeCallback(amount);
              } else {
                approveCallback();
              }
            } else {
              withdrawCallback();
            }
          }}
        >
          {!isStake ? 'Confirm' : approved ? 'Confirm' : 'Approve'}
        </StyledButton>
      </ButtonContainer>
    </Modal>
  );
}
