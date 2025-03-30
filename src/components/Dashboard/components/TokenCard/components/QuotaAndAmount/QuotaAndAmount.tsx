import { Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IQuotaAndAmountProps {
  quota: string;
  amount: string;
  isLoading: boolean;
}

export const QuotaAndAmount = ({ quota, amount, isLoading }: IQuotaAndAmountProps) => (
  <StyledQuotaContainer>
    <Typography>{quota}</Typography>

    {isLoading && <Skeleton width={50} height={32} />}

    {!isLoading && <Typography variant='h6'>{amount}</Typography>}
  </StyledQuotaContainer>
);

const StyledQuotaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
