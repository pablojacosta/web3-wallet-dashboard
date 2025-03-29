import { Button, CircularProgress } from '@mui/material';

interface ITransactionButtonProps {
  handleTransaction: () => void;
  isTransacting: boolean;
  isButtonDisabled: boolean;
  text: string;
}

export const TransactionButton = ({
  handleTransaction,
  isTransacting,
  isButtonDisabled,
  text,
}: ITransactionButtonProps) => (
  <Button variant='contained' onClick={handleTransaction} disabled={isButtonDisabled}>
    {isTransacting ? <CircularProgress size={24} /> : text}
  </Button>
);
