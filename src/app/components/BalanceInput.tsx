import React from 'react';
import styled from 'styled-components/macro';
import BNBIcon from './Icons/BNBIcon';

const BalanceText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  text-align: left;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
`;

const BalanceInputWrapper = styled.div`
  padding-left: 43px;
  width: 100%;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.075);
  border-radius: 25px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  outline: none;
  font-weight: 300;
  letter-spacing: 1px;
  text-align: center;
  font-size: 22px;
  color: white;
  background-color: transparent;
  border: none;
  width: calc(100% - 43px);
`;

type Props = {
  max: string;
  value: string;
  setValue: (v: string) => void;
  showIcon?: boolean;
};

export default function BalanceInput({
  max,
  value,
  setValue,
  showIcon = true,
}: Props) {
  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      setValue(nextUserInput);
    }
  };

  return (
    <>
      <BalanceText>Balance: {max}</BalanceText>
      <BalanceInputWrapper>
        <StyledInput
          type="text"
          className="auctionInput"
          value={value}
          onChange={e => {
            enforcer(e.target.value.replace(/,/g, '.'));
          }}
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
        />
        {showIcon && <BNBIcon />}
      </BalanceInputWrapper>
    </>
  );
}
