import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EventTable } from '~/components/Dashboard/components/EventTable';
import { ETokenType } from '~/enums';
import { useEventStore } from '~/store/useEventStore';
import { truncateAddress } from '~/utils';

vi.mock('~/store/useEventStore', () => ({
  useEventStore: vi.fn(),
}));

describe('EventTable', () => {
  const mockEvents = [
    {
      type: 'transfer',
      token: ETokenType.DAI,
      amount: '100',
      sender: '0x1234567890123456789012345678901234567890',
      recipient: '0x0987654321098765432109876543210987654321',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    },
    {
      type: 'approve',
      token: ETokenType.USDC,
      amount: '200',
      sender: '0x2234567890123456789012345678901234567890',
      recipient: '0x1987654321098765432109876543210987654321',
      hash: '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('displays "No events to display" when events array is empty', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: [] });

    render(<EventTable />);

    expect(screen.getByText('No events to display')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    const expectedHeaders = ['Transaction', 'Token', 'Amount', 'From', 'To', 'Tx'];
    expectedHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders event data correctly', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    expect(screen.getByText('Transfer')).toBeInTheDocument();
    expect(screen.getByText('DAI')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument();
    expect(screen.getByText('0x0987...4321')).toBeInTheDocument();
    expect(screen.getByText('0xabcd...7890')).toBeInTheDocument();

    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('USDC')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('0x2234...7890')).toBeInTheDocument();
    expect(screen.getByText('0x1987...4321')).toBeInTheDocument();
    expect(screen.getByText('0xbcde...890a')).toBeInTheDocument();
  });

  it('renders table with correct structure', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const tableHead = table.querySelector('thead');
    expect(tableHead).toBeInTheDocument();
    expect(tableHead?.querySelectorAll('th')).toHaveLength(6);

    const tableBody = table.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
    expect(tableBody?.querySelectorAll('tr')).toHaveLength(2);
  });

  it('applies truncateAddress to addresses and hashes', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    mockEvents.forEach((event) => {
      expect(screen.getByText(`${truncateAddress(event.sender)}`)).toBeInTheDocument();
      expect(screen.getByText(`${truncateAddress(event.recipient)}`)).toBeInTheDocument();
      expect(screen.getByText(`${truncateAddress(event.hash)}`)).toBeInTheDocument();
    });
  });

  it('displays correct event type titles', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    expect(screen.getByText('Transfer')).toBeInTheDocument();
    expect(screen.getByText('Approve')).toBeInTheDocument();
  });

  it('renders sticky header', () => {
    vi.mocked(useEventStore).mockReturnValue({ events: mockEvents });

    render(<EventTable />);

    const table = screen.getByRole('table');
    const tableHeader = table.querySelector('thead');
    expect(tableHeader).toHaveStyle({ position: 'sticky' });
  });
});
