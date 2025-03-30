import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useModalStore } from '~/store/useModalStore';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    padding: theme.spacing(2),
  },
}));

export const ErrorModal = () => {
  const { showErrorModal, setShowErrorModal, errorMessage } = useModalStore();

  return (
    <StyledDialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>{errorMessage || 'An error occurred.'}</DialogContent>
      <DialogActions>
        <Button onClick={() => setShowErrorModal(false)} variant='contained' color='primary'>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
