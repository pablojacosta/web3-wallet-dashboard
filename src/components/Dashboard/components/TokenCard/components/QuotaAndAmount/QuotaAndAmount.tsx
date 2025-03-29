import { Box, Typography } from '@mui/material';

interface IQuotaAndAmountProps {
  quota: string;
  amount: number;
}

export const QuotaAndAmount = ({ quota, amount }: IQuotaAndAmountProps) => (
  <Box>
    <Typography>{quota}</Typography>

    <Typography variant='h6'>{amount}</Typography>
  </Box>
);
