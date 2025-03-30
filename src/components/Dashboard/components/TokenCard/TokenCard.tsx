import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETokenType, ETransactionType } from '~/enums';
import { useTokenContract } from '~/hooks/useTokenContract';
import { useWalletStore } from '~/store/useWalletStore';
import { Allowance } from './components/Allowance';
import { Mint } from './components/Mint';
import { QuotaAndAmount } from './components/QuotaAndAmount';
import { Transaction } from './components/Transaction';

interface ITokenCardProps {
  token: ETokenType;
}

export const TokenCard = ({ token }: ITokenCardProps) => {
  const {
    transfer,
    approve,
    mint,
    checkAllowance,
    isTransferring,
    isApproving,
    isMinting,
    formattedBalance,
    formattedAllowance,
    isLoadingBalance,
    isLoadingAllowance,
  } = useTokenContract(token);
  const { address: walletAddress } = useWalletStore();
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [approveAmount, setApproveAmount] = useState('');
  const [spender, setSpender] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [allowedSpender, setAllowedSpender] = useState('');

  const handleTransfer = () => {
    if (!transferAmount || !recipient) return;

    transfer(recipient, transferAmount);
    setTransferAmount('');
    setRecipient('');
  };

  const handleApprove = () => {
    if (!approveAmount || !spender) return;

    approve(spender, approveAmount);
    setApproveAmount('');
    setSpender('');
  };

  const handleMint = () => {
    if (!mintAmount || !walletAddress) return;

    mint(walletAddress, mintAmount);
    setMintAmount('');
  };

  const handleSetAllowedSpender = (allowedSpender: string) => {
    setAllowedSpender(allowedSpender);
  };

  return (
    <TokenCardContainer>
      <Typography variant='h5' gutterBottom>
        {token}
      </Typography>

      <QuotaAndAmount quota='Balance' amount={formattedBalance} isLoading={isLoadingBalance} />

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

      <Allowance
        allowance={formattedAllowance}
        spender={allowedSpender}
        handleSetAllowedSpender={handleSetAllowedSpender}
        isLoading={isLoadingAllowance}
        checkAllowance={checkAllowance}
      />

      <Mint
        amount={mintAmount}
        setAmount={setMintAmount}
        handleMint={handleMint}
        isMinting={isMinting}
        isButtonDisabled={isMinting || !mintAmount}
      />
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
  gap: '2rem',
  borderRadius: '0.5rem',
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
