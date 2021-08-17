import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Modal from 'react-modal';
import {
  useLpStakingAccumulatedRewards,
  useLpStakingRewardsWithdrawable,
  useLpStakingClaimRewards,
} from 'hooks/lpStake';

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
  network?: string;
  isOpen: boolean;
  closeModal: () => void;
};

export default function LpClaimModal({
  isOpen,
  closeModal,
  network = 'Bsc',
}: Props) {
  const accumulatedRewards = useLpStakingAccumulatedRewards(network);
  const reward = useLpStakingRewardsWithdrawable(network)
    ? accumulatedRewards
    : 0;

  const { claimCallback } = useLpStakingClaimRewards();

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
      <div>dART accumulated rewards: {accumulatedRewards.toFixed(2)}</div>
      <div>dART claimable rewards: {reward}</div>
      <ButtonContainer>
        <StyledButton onClick={closeModal}>Cancel</StyledButton>
        <StyledButton
          onClick={() => {
            claimCallback();
          }}
        >
          Confirm
        </StyledButton>
      </ButtonContainer>
    </Modal>
  );
}
