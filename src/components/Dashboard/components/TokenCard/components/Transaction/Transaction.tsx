import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransactionButton } from '~/components/Shared/TransactionButton';
import { ETransactionType } from '~/enums';

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
          disabled={isTransacting}
          inputProps={{
            'data-testid': `address-input-${transactionType}`,
          }}
        />

        <TextField
          label='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          size='small'
          fullWidth
          inputProps={{
            'data-testid': `amount-input-${transactionType}`,
          }}
        />

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

const InputsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },

  '& .MuiInputLabel-root, & input': {
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));
