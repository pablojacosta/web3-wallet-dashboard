import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EMessageStatus } from '~/enums';
import { useModalStore } from '~/store/useModalStore';

export const Modal = () => {
  const { showModal, setShowModal, message, messageStatus } = useModalStore();

  const isLoadingStatus = messageStatus === EMessageStatus.LOADING;

  return (
    <StyledDialog open={showModal} onClose={() => setShowModal(false)}>
      {messageStatus && !isLoadingStatus && <DialogTitle>{messageStatus.toLocaleUpperCase()}</DialogTitle>}

      <DialogContent>{message || 'An error occurred.'}</DialogContent>

      {messageStatus && isLoadingStatus && <CircularProgress size={24} />}

      <DialogActions>
        <Button
          onClick={() => setShowModal(false)}
          variant='contained'
          color={messageStatus !== EMessageStatus.LOADING ? messageStatus : 'primary'}
        >
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
}));
