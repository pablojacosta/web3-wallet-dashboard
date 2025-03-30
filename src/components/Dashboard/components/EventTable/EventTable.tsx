import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEventStore } from '~/store/useEventStore';
import { getEventTypeTitle, truncateAddress } from '~/utils';

export const EventTable = () => {
  const { events } = useEventStore();

  if (events.length === 0) {
    return (
      <Box>
        <Typography>No events to display</Typography>
      </Box>
    );
  }

  return (
    <StyledTableContainer>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Transaction</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Tx</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.hash}>
                <TableCell>{getEventTypeTitle(event.type)}</TableCell>
                <TableCell>{event.token}</TableCell>
                <TableCell>{event.amount}</TableCell>
                <TableCell>{truncateAddress(event.sender)}</TableCell>
                <TableCell>{truncateAddress(event.recipient)}</TableCell>
                <TableCell>{truncateAddress(event.hash)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '50rem',
  maxHeight: '25rem',
  height: '100%',
  overflowY: 'auto',

  '& .MuiPaper-root': {
    marginTop: '0',
    border: theme.palette.border,
  },

  '& .MuiTableContainer-root': {
    maxHeight: '25rem',
  },

  '& .MuiTableHead-root': {
    position: 'sticky',
    top: 0,
  },
}));
