import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Modal from 'react-modal';
import config from 'contracts/config';
import {
  useLpApprove,
  useLPBalance,
  useLpStakeAmount,
  useLpStakingAccumulatedRewards,
  useStakeLp,
  useUnstakeLp,
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
  isStake?: boolean;
  isOpen: boolean;
  network?: string;
  closeModal: () => void;
};

export default function LpStakeModal({
  isOpen,
  closeModal,
  isStake = true,
  network = 'Bsc',
}: Props) {
  const lpBalance = useLPBalance(network);
  const stakeBalance = useLpStakeAmount(network);

  const { stakeCallback } = useStakeLp();
  const { unStakeCallback } = useUnstakeLp();

  const [amount, setAmount] = useState('0');

  const { approved, approveCallback } = useLpApprove(
    amount,
    config.deployments.LPStaking[`address${network}`],
    network,
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
      {isStake
        ? network === 'Bsc'
          ? 'dART-BNB LP'
          : 'dART-ETH LP'
        : 'Staked LP'}{' '}
      Balance: {isStake ? lpBalance : stakeBalance}
      <br />
      <div>
        <StyledInput value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <ButtonContainer>
        <StyledButton onClick={closeModal}>Cancel</StyledButton>
        <StyledButton
          onClick={() => {
            if (isStake) {
              if (approved) {
                stakeCallback(amount, network);
              } else {
                approveCallback(network);
              }
            } else {
              unStakeCallback(amount, network);
            }
          }}
        >
          {!isStake ? 'Confirm' : approved ? 'Confirm' : 'Approve'}
        </StyledButton>
      </ButtonContainer>
    </Modal>
  );
}
