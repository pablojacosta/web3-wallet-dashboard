import { Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IBalance {
  amount: string;
  isLoading: boolean;
}

export const Balance = ({ amount, isLoading }: IBalance) => (
  <StyledQuotaContainer>
    <Typography>Balance</Typography>

    {isLoading && <Skeleton width={50} height={32} data-testid='skeleton' />}

    {!isLoading && (
      <Typography variant='h6' data-testid='balance-amount'>
        {amount}
      </Typography>
    )}
  </StyledQuotaContainer>
);

const StyledQuotaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
