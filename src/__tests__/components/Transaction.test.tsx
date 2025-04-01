import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Transaction } from '~/components/Dashboard/components/TokenCard/components/Transaction';
import { ETransactionType } from '~/enums';

describe('Transaction', () => {
  const mockSetAddress = vi.fn();
  const mockSetAmount = vi.fn();
  const mockHandleTransaction = vi.fn();

  const defaultProps = {
    transactionType: ETransactionType.TRANSFER,
    address: '',
    setAddress: mockSetAddress,
    amount: '',
    setAmount: mockSetAmount,
    handleTransaction: mockHandleTransaction,
    isTransacting: false,
    isButtonDisabled: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders transfer transaction correctly', () => {
    render(<Transaction {...defaultProps} />);

    expect(screen.getByTestId('address-input-transfer-parent')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input-transfer-parent')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Transfer' })).toBeInTheDocument();
  });

  it('renders approve transaction correctly', () => {
    render(<Transaction {...defaultProps} transactionType={ETransactionType.APPROVE} />);

    expect(screen.getByTestId('address-input-approve-parent')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input-approve-parent')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
  });

  it('handles address input change', () => {
    render(<Transaction {...defaultProps} />);

    const addressInput = screen.getByTestId('address-input-transfer-parent').querySelector('input');

    if (addressInput) {
      fireEvent.change(addressInput, { target: { value: '0x123' } });
    }

    expect(mockSetAddress).toHaveBeenCalledWith('0x123');
  });

  it('handles amount input change', () => {
    render(<Transaction {...defaultProps} />);

    const amountInput = screen.getByTestId('amount-input-transfer-parent').querySelector('input');

    if (amountInput) {
      fireEvent.change(amountInput, { target: { value: '100' } });
    }

    expect(mockSetAmount).toHaveBeenCalledWith('100');
  });

  it('disables inputs and button when transaction is in progress', () => {
    render(<Transaction {...defaultProps} isTransacting={true} />);

    const addressInput = screen.getByTestId('address-input-transfer-parent').querySelector('input');
    const button = screen.getByTestId('button-transfer');

    expect(addressInput).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('handles transaction button click', () => {
    render(<Transaction {...defaultProps} isButtonDisabled={false} />);

    const button = screen.getByRole('button', { name: 'Transfer' });
    fireEvent.click(button);

    expect(mockHandleTransaction).toHaveBeenCalled();
  });

  it('shows correct label for transfer address input', () => {
    render(<Transaction {...defaultProps} />);

    expect(screen.getByLabelText('To Address')).toBeInTheDocument();
  });

  it('shows correct label for approve address input', () => {
    render(<Transaction {...defaultProps} transactionType={ETransactionType.APPROVE} />);

    expect(screen.getByLabelText('Spender Address')).toBeInTheDocument();
  });

  it('displays initial values correctly', () => {
    const initialValues = {
      ...defaultProps,
      address: '0x456',
      amount: '50',
    };

    render(<Transaction {...initialValues} />);

    const addressInput = screen.getByTestId('address-input-transfer-parent').querySelector('input');
    const amountInput = screen.getByTestId('amount-input-transfer-parent').querySelector('input');

    expect(addressInput).toHaveValue('0x456');
    expect(amountInput).toHaveValue('50');
  });

  it('maintains disabled state when button is disabled', () => {
    render(<Transaction {...defaultProps} isButtonDisabled={true} />);

    const button = screen.getByRole('button', { name: 'Transfer' });
    fireEvent.click(button);

    expect(mockHandleTransaction).not.toHaveBeenCalled();
  });
});
