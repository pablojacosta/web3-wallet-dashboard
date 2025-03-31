import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Toggle } from '~/components/Dashboard/components/Toggle';
import { ETokenType } from '~/enums';

describe('Toggle', () => {
  const mockHandleTokenChange = vi.fn();

  const defaultProps = {
    selectedToken: ETokenType.DAI,
    handleTokenChange: mockHandleTokenChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders toggle component correctly', () => {
    render(<Toggle {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'DAI token' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USDC token' })).toBeInTheDocument();
  });

  it('shows DAI as selected when DAI is the selected token', () => {
    render(<Toggle {...defaultProps} />);

    const daiButton = screen.getByRole('button', { name: 'DAI token' });
    const usdcButton = screen.getByRole('button', { name: 'USDC token' });

    expect(daiButton).toHaveAttribute('aria-pressed', 'true');
    expect(usdcButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows USDC as selected when USDC is the selected token', () => {
    render(<Toggle {...defaultProps} selectedToken={ETokenType.USDC} />);

    const daiButton = screen.getByRole('button', { name: 'DAI token' });
    const usdcButton = screen.getByRole('button', { name: 'USDC token' });

    expect(daiButton).toHaveAttribute('aria-pressed', 'false');
    expect(usdcButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls handleTokenChange when DAI is selected', () => {
    render(<Toggle {...defaultProps} selectedToken={ETokenType.USDC} />);

    const daiButton = screen.getByRole('button', { name: 'DAI token' });
    fireEvent.click(daiButton);

    expect(mockHandleTokenChange).toHaveBeenCalled();
  });

  it('calls handleTokenChange when USDC is selected', () => {
    render(<Toggle {...defaultProps} />);

    const usdcButton = screen.getByRole('button', { name: 'USDC token' });
    fireEvent.click(usdcButton);

    expect(mockHandleTokenChange).toHaveBeenCalled();
  });

  it('displays correct token labels', () => {
    render(<Toggle {...defaultProps} />);

    expect(screen.getByText(ETokenType.DAI)).toBeInTheDocument();
    expect(screen.getByText(ETokenType.USDC)).toBeInTheDocument();
  });

  it('has correct ARIA labels for accessibility', () => {
    render(<Toggle {...defaultProps} />);

    expect(screen.getByRole('group', { name: 'token selection' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'DAI token' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USDC token' })).toBeInTheDocument();
  });
});
