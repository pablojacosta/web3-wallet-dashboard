import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETokenType } from '~/enums/tokenType';
import { ETransactionType } from '~/enums/transactionType';
import { QuotaAndAmount } from './components/QuotaAndAmount';
import { Transaction } from './components/Transaction';

interface ITokenCardProps {
  token: ETokenType;
}

export const TokenCard = ({ token }: ITokenCardProps) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [spender, setSpender] = useState('');

  // TODO: replace mocks with real values
  const handleTransfer = async () => {
    console.log('transfer');
  };

  const handleApprove = async () => {
    console.log('approve');
  };

  const isTransferring = false;
  const isApproving = false;

  return (
    <TokenCardContainer>
      <Typography variant='h5' gutterBottom>
        {token}
      </Typography>

      <QuotasContainer>
        <QuotaAndAmount quota='Balance' amount={100} />

        <QuotaAndAmount quota='Allowance' amount={100} />
      </QuotasContainer>

      <TransactionsContainer>
        <Transaction
          transactionType={ETransactionType.TRANSFER}
          address={transferTo}
          setAddress={setTransferTo}
          amount={transferAmount}
          setAmount={setTransferAmount}
          handleTransaction={handleTransfer}
          isTransacting={isTransferring}
          isButtonDisabled={isTransferring || !transferAmount || !transferTo}
        />

        <Transaction
          transactionType={ETransactionType.APPROVE}
          address={spender}
          setAddress={setSpender}
          amount={approveAmount}
          setAmount={setApproveAmount}
          handleTransaction={handleApprove}
          isTransacting={isApproving}
          isButtonDisabled={isApproving || !approveAmount || !spender}
        />
      </TransactionsContainer>
    </TokenCardContainer>
  );
};

const TokenCardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.secondary,
  width: '100%',
  maxWidth: '30rem',
  color: theme.palette.text.secondary,
  gap: '1rem',
  borderRadius: '0.5rem',
}));

const QuotasContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '30rem',
  color: theme.palette.text.secondary,
}));

const TransactionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '1rem',
  color: theme.palette.text.secondary,
}));
