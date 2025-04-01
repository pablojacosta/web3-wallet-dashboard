import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { TokenCard } from '~/components/Dashboard/components/TokenCard';
import { ETokenType } from '~/enums';
import { useTokenContract } from '~/hooks/useTokenContract';
import { useWalletStore } from '~/store/useWalletStore';

vi.mock('~/hooks/useTokenContract', async () => {
  const actual = await vi.importActual<typeof import('~/hooks/useTokenContract')>('~/hooks/useTokenContract');
  return {
    ...actual,
    useTokenContract: vi.fn(),
  };
});

vi.mock('~/store/useWalletStore', async () => {
  const actual = await vi.importActual<typeof import('~/store/useWalletStore')>('~/store/useWalletStore');
  return {
    ...actual,
    useWalletStore: vi.fn(),
  };
});

describe('TokenCard', () => {
  const mockTransfer = vi.fn();
  const mockApprove = vi.fn();
  const mockMint = vi.fn();
  const mockCheckAllowance = vi.fn();
  const mockWalletAddress = '0x123';

  beforeEach(() => {
    vi.clearAllMocks();
    (useTokenContract as Mock).mockReturnValue({
      transfer: mockTransfer,
      approve: mockApprove,
      mint: mockMint,
      checkAllowance: mockCheckAllowance,
      isTransferring: false,
      isApproving: false,
      isMinting: false,
      formattedBalance: '100',
      formattedAllowance: '50',
      isLoadingBalance: false,
      isLoadingAllowance: false,
    });
    (useWalletStore as unknown as Mock).mockReturnValue({
      address: mockWalletAddress,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders token information correctly', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    expect(screen.getByTestId('token-title')).toHaveTextContent('DAI');
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles transfer transaction correctly', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    const recipientInput = screen.getByTestId('address-input-transfer-parent').querySelector('input');
    const amountInput = screen.getByTestId('amount-input-transfer-parent').querySelector('input');
    const transferButton = screen.getByRole('button', { name: 'Transfer' });

    if (recipientInput && amountInput) {
      fireEvent.change(recipientInput, { target: { value: '0x456' } });
      fireEvent.change(amountInput, { target: { value: '10' } });
    }
    fireEvent.click(transferButton);

    expect(mockTransfer).toHaveBeenCalledWith('0x456', '10');
  });

  it('handles approve transaction correctly', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    const spenderInput = screen.getByTestId('address-input-approve-parent').querySelector('input');
    const amountInput = screen.getByTestId('amount-input-approve-parent').querySelector('input');
    const approveButton = screen.getByRole('button', { name: 'Approve' });

    if (spenderInput && amountInput) {
      fireEvent.change(spenderInput, { target: { value: '0x789' } });
      fireEvent.change(amountInput, { target: { value: '20' } });
    }
    fireEvent.click(approveButton);

    expect(mockApprove).toHaveBeenCalledWith('0x789', '20');
  });

  it('handles mint transaction correctly', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    const amountInput = screen.getByRole('spinbutton', { name: 'Amount to Mint' });
    const mintButton = screen.getByRole('button', { name: 'Mint' });

    if (amountInput) {
      fireEvent.change(amountInput, { target: { value: '30' } });
      fireEvent.click(mintButton);
    }

    expect(mockMint).toHaveBeenCalledWith(mockWalletAddress, '30');
  });

  it('shows loading states correctly', () => {
    (useTokenContract as Mock).mockReturnValue({
      transfer: mockTransfer,
      approve: mockApprove,
      mint: mockMint,
      checkAllowance: mockCheckAllowance,
      isTransferring: true,
      isApproving: true,
      isMinting: true,
      formattedBalance: '100',
      formattedAllowance: '50',
      isLoadingBalance: true,
      isLoadingAllowance: true,
    });

    render(<TokenCard token={ETokenType.DAI} />);

    expect(screen.getByTestId('button-transfer')).toBeDisabled();
    expect(screen.getByTestId('button-approve')).toBeDisabled();
    expect(screen.getByTestId('button-mint')).toBeDisabled();
  });

  it('disables transaction buttons when inputs are empty', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    expect(screen.getByRole('button', { name: 'Transfer' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Approve' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Mint' })).toBeDisabled();
  });

  it('checks allowance when spender address is provided', () => {
    render(<TokenCard token={ETokenType.DAI} />);

    const spenderInput = screen.getByTestId('spender-input-parent').querySelector('input');

    if (spenderInput) {
      fireEvent.change(spenderInput, { target: { value: '0x789' } });
      const checkButton = screen.getByRole('button', { name: 'Check' });
      fireEvent.click(checkButton);
    }

    expect(mockCheckAllowance).toHaveBeenCalledWith('0x789');
    expect(screen.getByText('Check Allowance: 50')).toBeInTheDocument();
  });
});
