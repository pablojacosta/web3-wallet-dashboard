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

export const EventTable = () => {
  const events = [
    {
      type: 'transfer',
      token: 'DAI',
      amount: 10,
      recipient: '0x1234',
      sender: '0x4321',
      tx: '0x99999',
    },
    {
      type: 'approve',
      token: 'USDC',
      amount: 100,
      recipient: '0x4321',
      sender: '0x1234',
      tx: '0x11111',
    },
    {
      type: 'transfer',
      token: 'DAI',
      amount: 10,
      recipient: '0x1234',
      sender: '0x4321',
      tx: '0x99999',
    },
    {
      type: 'approve',
      token: 'USDC',
      amount: 100,
      recipient: '0x4321',
      sender: '0x1234',
      tx: '0x11111',
    },
    {
      type: 'transfer',
      token: 'DAI',
      amount: 10,
      recipient: '0x1234',
      sender: '0x4321',
      tx: '0x99999',
    },
  ];

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
              <TableRow key={event.tx}>
                <TableCell>{event.type}</TableCell>
                <TableCell>{event.token}</TableCell>
                <TableCell>{event.amount}</TableCell>
                <TableCell>{event.sender}</TableCell>
                <TableCell>{event.recipient}</TableCell>
                <TableCell>{event.tx}</TableCell>
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
