import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Mint } from '~/components/Dashboard/components/TokenCard/components/Mint';

describe('Mint', () => {
  const mockSetAmount = vi.fn();
  const mockHandleMint = vi.fn();

  const defaultProps = {
    amount: '',
    setAmount: mockSetAmount,
    handleMint: mockHandleMint,
    isMinting: false,
    isButtonDisabled: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders mint component correctly', () => {
    render(<Mint {...defaultProps} />);

    expect(screen.getByRole('spinbutton', { name: 'Amount to Mint' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mint' })).toBeInTheDocument();
  });

  it('handles amount input change', () => {
    render(<Mint {...defaultProps} />);

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount to Mint' });
    fireEvent.change(amountInput, { target: { value: '100' } });

    expect(mockSetAmount).toHaveBeenCalledWith('100');
  });

  it('disables input when minting is in progress', () => {
    render(<Mint {...defaultProps} isMinting={true} />);

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount to Mint' });
    expect(amountInput).toBeDisabled();
  });

  it('handles mint button click', () => {
    render(<Mint {...defaultProps} isButtonDisabled={false} />);

    const mintButton = screen.getByRole('button', { name: 'Mint' });
    fireEvent.click(mintButton);

    expect(mockHandleMint).toHaveBeenCalled();
  });

  it('displays initial amount value correctly', () => {
    render(<Mint {...defaultProps} amount='50' />);

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount to Mint' });
    expect(amountInput).toHaveValue(50);
  });

  it('maintains disabled state when button is disabled', () => {
    render(<Mint {...defaultProps} isButtonDisabled={true} />);

    const mintButton = screen.getByRole('button', { name: 'Mint' });
    fireEvent.click(mintButton);

    expect(mockHandleMint).not.toHaveBeenCalled();
    expect(mintButton).toBeDisabled();
  });

  it('shows loading state in button when minting', () => {
    render(<Mint {...defaultProps} isMinting={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('allows only numeric input', () => {
    render(<Mint {...defaultProps} />);

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount to Mint' });

    fireEvent.change(amountInput, { target: { value: '123' } });
    expect(mockSetAmount).toHaveBeenCalledWith('123');

    fireEvent.change(amountInput, { target: { value: 'abc' } });
    expect(amountInput).toHaveValue(null);
  });
});
