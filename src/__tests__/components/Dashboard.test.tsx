/* eslint-disable import/order */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, vi, describe, it, beforeEach, Mock, afterEach } from 'vitest';
import { Dashboard } from '~/components/Dashboard';
import { useEventStore } from '~/store/useEventStore';
import { useWalletStore } from '~/store/useWalletStore';

vi.mock('~/store/useWalletStore', async () => {
  const actual = await vi.importActual<typeof import('~/store/useWalletStore')>('~/store/useWalletStore');

  return {
    ...actual,
    useWalletStore: vi.fn(),
  };
});

vi.mock('~/store/useEventStore', async () => {
  const actual = await vi.importActual<typeof import('~/store/useEventStore')>('~/store/useEventStore');

  return {
    ...actual,
    useEventStore: vi.fn(),
  };
});

// Import the mocked useAccount after mocking
import { useAccount } from 'wagmi';

describe('Dashboard', () => {
  const mockSetAddress = vi.fn();
  const mockAddress = '0x123456789';

  beforeEach(() => {
    vi.clearAllMocks();
    (useWalletStore as unknown as Mock).mockReturnValue({ setAddress: mockSetAddress });
    (useEventStore as unknown as Mock).mockReturnValue({ events: [] });
    (useAccount as Mock).mockReturnValue({ address: mockAddress, isConnected: true });
  });

  afterEach(cleanup);

  it('shows connect wallet message when not connected', () => {
    (useAccount as Mock).mockReturnValue({ address: undefined, isConnected: false });

    render(<Dashboard />);

    expect(
      screen.getByText('Please connect your wallet to view token balances and perform transactions'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'DAI token' })).not.toBeInTheDocument();
  });

  it('renders dashboard components when connected', () => {
    render(<Dashboard />);

    expect(screen.getByRole('button', { name: 'DAI token' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USDC token' })).toBeInTheDocument();

    expect(screen.getByTestId('token-title')).toHaveTextContent('DAI');
    expect(screen.getByText('Balance')).toBeInTheDocument();

    expect(screen.getByText('No events to display')).toBeInTheDocument();
  });

  it('updates selected token when toggle is clicked', () => {
    render(<Dashboard />);

    const usdcButton = screen.getByRole('button', { name: 'USDC token' });
    fireEvent.click(usdcButton);

    expect(screen.getByTestId('token-title')).toHaveTextContent('USDC');
  });

  it('calls setAddress when wallet address changes', () => {
    render(<Dashboard />);

    expect(mockSetAddress).toHaveBeenCalledWith(mockAddress);
  });

  it('displays events in the table when available', () => {
    const mockEvents = [
      {
        hash: '0xabc',
        type: 'TRANSFER',
        token: 'DAI',
        amount: '100',
        sender: '0x123',
        recipient: '0x456',
      },
    ];

    (useEventStore as unknown as Mock).mockReturnValue({ events: mockEvents });

    render(<Dashboard />);

    expect(screen.getByRole('columnheader', { name: 'Transaction' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Token' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'From' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'To' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tx' })).toBeInTheDocument();
  });

  it('maintains selected token state', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('token-title')).toHaveTextContent('DAI');

    const usdcButton = screen.getByRole('button', { name: 'USDC token' });
    fireEvent.click(usdcButton);

    expect(screen.getByTestId('token-title')).toHaveTextContent('USDC');
  });
});
