import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransactionButton } from '~/components/Shared/TransactionButton';

interface IMintProps {
  amount: string;
  setAmount: (value: string) => void;
  handleMint: () => void;
  isMinting: boolean;
  isButtonDisabled: boolean;
}

export const Mint = ({ amount, setAmount, handleMint, isMinting, isButtonDisabled }: IMintProps) => {
  return (
    <StyledMintContainer>
      <TextField
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label='Amount to Mint'
        type='number'
        size='small'
        fullWidth
        disabled={isMinting}
        inputProps={{
          'data-testid': 'mint-amount-input',
        }}
      />

      <TransactionButton
        handleTransaction={handleMint}
        isTransacting={isMinting}
        isButtonDisabled={isButtonDisabled}
        text='Mint'
      />
    </StyledMintContainer>
  );
};

const StyledMintContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  '& button': {
    width: '7rem',
  },

  '& .MuiInputLabel-root, & input': {
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));
