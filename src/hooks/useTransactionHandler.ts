import { EErrorMessage, EMessageStatus, ESuccessMessage, ETransactionErrors } from '~/enums';
import { useModalStore } from '~/store/useModalStore';

export const useTransactionHandler = () => {
  const { setShowModal } = useModalStore();

  const handleTransactionError = (error: Error) => {
    console.error('Transaction failed:', error);

    const errorMapping: Record<ETransactionErrors, EErrorMessage> = {
      [ETransactionErrors.INSUFFICIENT_FUNDS]: EErrorMessage.INSUFFICIENT_FUNDS,
      [ETransactionErrors.TRANSACTION_REJECTED]: EErrorMessage.TRANSACTION_REJECTED,
      [ETransactionErrors.INSUFFICIENT_ALLOWANCE]: EErrorMessage.INSUFFICIENT_ALLOWANCE,
    };

    const matchedError = Object.entries(errorMapping).find(([key]) => error.message.includes(key));

    setShowModal(true, matchedError ? matchedError[1] : EErrorMessage.TRANSACTION_FAILED, EMessageStatus.ERROR);
  };

  const executeTransaction = (transaction: () => void, onSuccess: () => void) => {
    setShowModal(true, ESuccessMessage.IN_PROGRESS, EMessageStatus.LOADING);

    try {
      transaction();
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        handleTransactionError(error);
      }
    }
  };

  return {
    executeTransaction,
    handleTransactionError,
  };
};
