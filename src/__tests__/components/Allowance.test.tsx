import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Allowance } from '~/components/Dashboard/components/TokenCard/components/Allowance';

describe('Allowance', () => {
  const mockHandleSetAllowedSpender = vi.fn();
  const mockCheckAllowance = vi.fn();

  const defaultProps = {
    allowance: '100',
    spender: '',
    handleSetAllowedSpender: mockHandleSetAllowedSpender,
    isLoading: false,
    checkAllowance: mockCheckAllowance,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders allowance component correctly', () => {
    render(<Allowance {...defaultProps} />);

    expect(screen.getByText('Check Allowance: 100')).toBeInTheDocument();
    expect(screen.getByTestId('spender-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check' })).toBeInTheDocument();
  });

  it('handles spender address input change', () => {
    render(<Allowance {...defaultProps} />);

    const spenderInput = screen.getByTestId('spender-input').querySelector('input');
    expect(spenderInput).toBeInTheDocument();

    fireEvent.change(spenderInput!, { target: { value: '0x123' } });
    expect(mockHandleSetAllowedSpender).toHaveBeenCalledWith('0x123');
  });

  it('disables input when loading', () => {
    render(<Allowance {...defaultProps} isLoading={true} />);

    const spenderInput = screen.getByTestId('spender-input').querySelector('input');
    expect(spenderInput).toBeDisabled();
  });

  it('disables check button when loading', () => {
    render(<Allowance {...defaultProps} isLoading={true} />);

    const checkButton = screen.getByRole('button');
    expect(checkButton).toBeDisabled();
  });

  it('disables check button when spender address is empty', () => {
    render(<Allowance {...defaultProps} spender='' />);

    const checkButton = screen.getByRole('button', { name: 'Check' });
    expect(checkButton).toBeDisabled();
  });

  it('enables check button when spender address is provided and not loading', () => {
    render(<Allowance {...defaultProps} spender='0x123' isLoading={false} />);

    const checkButton = screen.getByRole('button', { name: 'Check' });
    expect(checkButton).not.toBeDisabled();
  });

  it('handles check button click correctly', () => {
    const spenderAddress = '0x123';
    render(<Allowance {...defaultProps} spender={spenderAddress} />);

    const checkButton = screen.getByRole('button', { name: 'Check' });
    fireEvent.click(checkButton);

    expect(mockCheckAllowance).toHaveBeenCalledWith(spenderAddress);
    expect(mockHandleSetAllowedSpender).toHaveBeenCalledWith('');
  });

  it('shows loading state in button when checking', () => {
    render(<Allowance {...defaultProps} isLoading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays different allowance values correctly', () => {
    const { rerender } = render(<Allowance {...defaultProps} />);
    expect(screen.getByText('Check Allowance: 100')).toBeInTheDocument();

    rerender(<Allowance {...defaultProps} allowance='250' />);
    expect(screen.getByText('Check Allowance: 250')).toBeInTheDocument();
  });

  it('preserves spender input value', () => {
    render(<Allowance {...defaultProps} spender='0x123' />);

    const spenderInput = screen.getByTestId('spender-input').querySelector('input');
    expect(spenderInput).toHaveValue('0x123');
  });
});
