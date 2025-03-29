import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETransactionType } from '~/enums/transactionType';
import { TransactionButton } from './components/TransactionButton';

interface ITransactionProps {
  transactionType: ETransactionType;
  address: string;
  setAddress: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  handleTransaction: () => void;
  isTransacting: boolean;
  isButtonDisabled: boolean;
}

export const Transaction = ({
  transactionType,
  address,
  setAddress,
  amount,
  setAmount,
  handleTransaction,
  isTransacting,
  isButtonDisabled,
}: ITransactionProps) => {
  const isTransfer = transactionType === ETransactionType.TRANSFER;
  const transactiontext = isTransfer ? 'Transfer' : 'Approve';

  return (
    <Box>
      <Typography gutterBottom>{transactiontext}</Typography>

      <InputsContainer>
        <TextField
          label={isTransfer ? 'To Address' : 'Spender Address'}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size='small'
          fullWidth
        />

        <TextField label='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} size='small' fullWidth />

        <TransactionButton
          handleTransaction={handleTransaction}
          isButtonDisabled={isButtonDisabled}
          isTransacting={isTransacting}
          text={transactiontext}
        />
      </InputsContainer>
    </Box>
  );
};

const InputsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',
});
