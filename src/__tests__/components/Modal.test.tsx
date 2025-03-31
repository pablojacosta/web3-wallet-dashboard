import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, Mock, expect } from 'vitest';
import { Modal } from '~/components/Modal';
import { EMessageStatus } from '~/enums';
import { useModalStore } from '~/store/useModalStore';

vi.mock('~/store/useModalStore', async () => {
  const actual = await vi.importActual<typeof import('~/store/useModalStore')>('~/store/useModalStore');

  return {
    ...actual,
    useModalStore: vi.fn(),
  };
});

describe('Modal', () => {
  const mockSetShowModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders error message correctly', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Test error message',
      messageStatus: EMessageStatus.ERROR,
    });

    render(<Modal />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });

  it('renders success message correctly', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Test success message',
      messageStatus: EMessageStatus.SUCCESS,
    });

    render(<Modal />);

    expect(screen.getByText('Test success message')).toBeInTheDocument();
    expect(screen.getByText('SUCCESS')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Loading...',
      messageStatus: EMessageStatus.LOADING,
    });

    render(<Modal />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('LOADING')).not.toBeInTheDocument();
  });

  it('does not render when showModal is false', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: false,
      setShowModal: mockSetShowModal,
      message: 'Test message',
      messageStatus: EMessageStatus.ERROR,
    });

    render(<Modal />);

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('shows default error message when no message is provided', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: '',
      messageStatus: EMessageStatus.ERROR,
    });

    render(<Modal />);

    expect(screen.getByText('An error occurred.')).toBeInTheDocument();
  });

  it('applies correct button color based on message status', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Test message',
      messageStatus: EMessageStatus.ERROR,
    });

    render(<Modal />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveClass('MuiButton-containedError');
  });

  it('applies primary color to button during loading state', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Loading...',
      messageStatus: EMessageStatus.LOADING,
    });

    render(<Modal />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveClass('MuiButton-containedPrimary');
  });

  it('calls setShowModal when close button is clicked', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      showModal: true,
      setShowModal: mockSetShowModal,
      message: 'Test message',
      messageStatus: EMessageStatus.ERROR,
    });

    render(<Modal />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
