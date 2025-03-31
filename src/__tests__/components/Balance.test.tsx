import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Balance } from '~/components/Dashboard/components/TokenCard/components/Balance';

describe('Balance', () => {
  const defaultProps = {
    amount: '100',
    isLoading: false,
  };

  afterEach(() => {
    cleanup();
  });

  it('renders balance label correctly', () => {
    render(<Balance {...defaultProps} />);
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });

  it('displays the amount when not loading', () => {
    render(<Balance {...defaultProps} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows skeleton when loading', () => {
    render(<Balance {...defaultProps} isLoading={true} />);

    expect(screen.queryByText('100')).not.toBeInTheDocument();
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('displays different amount values correctly', () => {
    const { rerender } = render(<Balance {...defaultProps} amount='250.5' />);
    expect(screen.getByText('250.5')).toBeInTheDocument();

    rerender(<Balance {...defaultProps} amount='0' />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('maintains balance label visibility during loading', () => {
    render(<Balance {...defaultProps} isLoading={true} />);

    expect(screen.getByText('Balance')).toBeInTheDocument();
  });
});
