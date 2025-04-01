import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { EErrorMessage, EMessageStatus, ESuccessMessage, ETransactionErrors } from '~/enums';
import { useTransactionHandler } from '~/hooks/useTransactionHandler';
import { useModalStore } from '~/store/useModalStore';

vi.mock('~/store/useModalStore', () => ({
  useModalStore: vi.fn(),
}));

describe('useTransactionHandler', () => {
  const mockSetShowModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useModalStore).mockReturnValue({
      setShowModal: mockSetShowModal,
    });
  });

  describe('executeTransaction', () => {
    it('shows loading modal and executes transaction successfully', () => {
      const mockTransaction = vi.fn();
      const mockOnSuccess = vi.fn();
      const { result } = renderHook(() => useTransactionHandler());

      result.current.executeTransaction(mockTransaction, mockOnSuccess);

      expect(mockSetShowModal).toHaveBeenCalledWith(true, ESuccessMessage.IN_PROGRESS, EMessageStatus.LOADING);
      expect(mockTransaction).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it('handles transaction error with insufficient funds', () => {
      const mockTransaction = vi.fn(() => {
        throw new Error(ETransactionErrors.INSUFFICIENT_FUNDS);
      });
      const mockOnSuccess = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useTransactionHandler());

      result.current.executeTransaction(mockTransaction, mockOnSuccess);

      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.INSUFFICIENT_FUNDS, EMessageStatus.ERROR);
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('handles transaction error with insufficient allowance', () => {
      const mockTransaction = vi.fn(() => {
        throw new Error(ETransactionErrors.INSUFFICIENT_ALLOWANCE);
      });
      const mockOnSuccess = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useTransactionHandler());

      result.current.executeTransaction(mockTransaction, mockOnSuccess);

      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.INSUFFICIENT_ALLOWANCE, EMessageStatus.ERROR);
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('handles transaction rejection', () => {
      const mockTransaction = vi.fn(() => {
        throw new Error(ETransactionErrors.TRANSACTION_REJECTED);
      });
      const mockOnSuccess = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useTransactionHandler());

      result.current.executeTransaction(mockTransaction, mockOnSuccess);

      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.TRANSACTION_REJECTED, EMessageStatus.ERROR);
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('handles unknown transaction error', () => {
      const mockTransaction = vi.fn(() => {
        throw new Error('Unknown error');
      });
      const mockOnSuccess = vi.fn();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useTransactionHandler());

      result.current.executeTransaction(mockTransaction, mockOnSuccess);

      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.TRANSACTION_FAILED, EMessageStatus.ERROR);
      expect(mockOnSuccess).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('handleTransactionError', () => {
    it('handles error directly', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => useTransactionHandler());

      result.current.handleTransactionError(new Error('Test error'));

      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.TRANSACTION_FAILED, EMessageStatus.ERROR);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });
});
