import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETokenType } from '~/enums/tokenType';
import { ETransactionType } from '~/enums/transactionType';
import { useTokenContract } from '~/hooks/useTokenContract';
import { QuotaAndAmount } from './components/QuotaAndAmount';
import { Transaction } from './components/Transaction';

interface ITokenCardProps {
  token: ETokenType;
}

export const TokenCard = ({ token }: ITokenCardProps) => {
  const { transfer, approve, isTransferring, isApproving, formattedBalance, formattedAllowance } =
    useTokenContract(token);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [spender, setSpender] = useState('');

  const handleTransfer = async () => {
    if (!transferAmount || !recipient) return;
    await transfer(recipient, transferAmount);
    setTransferAmount('');
    setRecipient('');
  };

  const handleApprove = async () => {
    if (!approveAmount || !spender) return;
    await approve(spender, approveAmount);
    setApproveAmount('');
    setSpender('');
  };

  return (
    <TokenCardContainer>
      <Typography variant='h5' gutterBottom>
        {token}
      </Typography>

      <QuotasContainer>
        <QuotaAndAmount quota='Balance' amount={formattedBalance} />

        <QuotaAndAmount quota='Allowance' amount={formattedAllowance} />
      </QuotasContainer>

      <TransactionsContainer>
        <Transaction
          transactionType={ETransactionType.TRANSFER}
          address={recipient}
          setAddress={setRecipient}
          amount={transferAmount}
          setAmount={setTransferAmount}
          handleTransaction={handleTransfer}
          isTransacting={isTransferring}
          isButtonDisabled={isTransferring || !transferAmount || !recipient}
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

  '& button': {
    width: '7rem',
  },
}));
