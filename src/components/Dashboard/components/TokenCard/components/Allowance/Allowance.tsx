import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransactionButton } from '~/components/Shared/TransactionButton';

interface IAllowanceProps {
  allowance: string;
  spender: string;
  handleSetAllowedSpender: (spender: string) => void;
  isLoading: boolean;
  checkAllowance: (spender: string) => void;
}

export const Allowance = ({
  allowance,
  spender,
  handleSetAllowedSpender,
  isLoading,
  checkAllowance,
}: IAllowanceProps) => {
  const handleCheck = () => {
    checkAllowance(spender);
    handleSetAllowedSpender('');
  };

  return (
    <StyledAllowanceContainer>
      <Typography>Check Allowance: {allowance}</Typography>

      <TextField
        label='Spender Address'
        value={spender}
        onChange={(e) => handleSetAllowedSpender(e.target.value)}
        size='small'
        fullWidth
        disabled={isLoading}
        data-testid='spender-input-parent'
        inputProps={{
          'data-testid': 'spender-input',
        }}
      />

      <TransactionButton
        handleTransaction={handleCheck}
        isButtonDisabled={isLoading || !spender}
        isTransacting={isLoading}
        text='Check'
      />
    </StyledAllowanceContainer>
  );
};

const StyledAllowanceContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '1rem',

  '& .MuiInputLabel-root, & input': {
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },

  '& button': {
    width: '7rem',
  },
}));
