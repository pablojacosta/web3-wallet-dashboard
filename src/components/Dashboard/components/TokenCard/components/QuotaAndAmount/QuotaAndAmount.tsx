import { Box, Skeleton, Typography } from '@mui/material';

interface IQuotaAndAmountProps {
  quota: string;
  amount: string;
  isLoading: boolean;
}

export const QuotaAndAmount = ({ quota, amount, isLoading }: IQuotaAndAmountProps) => (
  <Box>
    <Typography>{quota}</Typography>

    {isLoading && <Skeleton width={50} height={32} />}

    {!isLoading && <Typography variant='h6'>{amount}</Typography>}
  </Box>
);
