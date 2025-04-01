/* eslint-disable import/order */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WagmiProvider } from 'wagmi';
import { EErrorMessage } from '~/enums';
import { useNetworkCheck } from '~/hooks/useNetworkCheck';
import { useModalStore } from '~/store/useModalStore';
import { config } from '~/utils/config';

vi.mock('wagmi', () => ({
  useChainId: vi.fn(),
  useSwitchChain: vi.fn(() => ({
    switchChain: vi.fn(),
  })),
  http: vi.fn(() => ({
    request: vi.fn(),
  })),
  createConfig: vi.fn(),
  WagmiProvider: ({ children }: { children: React.ReactNode }) => children,
  createStorage: vi.fn(() => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })),
  cookieStorage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

import { useChainId, useSwitchChain } from 'wagmi';

vi.mock('~/store/useModalStore', () => ({
  useModalStore: vi.fn(() => ({
    setShowModal: vi.fn(),
  })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );

  TestWrapper.displayName = 'TestWrapper';

  return TestWrapper;
};

const mockNetworkStates = {
  sepolia: () => {
    vi.mocked(useChainId).mockReturnValue(11155111);
  },
  mainnet: () => {
    vi.mocked(useChainId).mockReturnValue(1);
  },
  none: () => {
    (useChainId as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
  },
};

describe('useNetworkCheck', () => {
  it('returns true when on Sepolia network', () => {
    mockNetworkStates.sepolia();

    const { result } = renderHook(() => useNetworkCheck(), {
      wrapper: createWrapper(),
    });
    expect(result.current.chainId).toBe(11155111);
  });

  it('returns false when on different network', () => {
    mockNetworkStates.mainnet();

    const { result } = renderHook(() => useNetworkCheck(), {
      wrapper: createWrapper(),
    });
    expect(result.current.chainId).toBe(1);
  });

  it('returns false when no network is connected', () => {
    mockNetworkStates.none();

    const { result } = renderHook(() => useNetworkCheck(), {
      wrapper: createWrapper(),
    });
    expect(result.current.chainId).toBeUndefined();
  });

  it('calls switchChain when on wrong network', () => {
    mockNetworkStates.mainnet();

    const mockSwitchChain = vi.fn();
    (useSwitchChain as ReturnType<typeof vi.fn>).mockReturnValue({ switchChain: mockSwitchChain });

    const mockSetShowModal = vi.fn();
    vi.mocked(useModalStore).mockReturnValue({
      setShowModal: mockSetShowModal,
    });

    renderHook(() => useNetworkCheck(), {
      wrapper: createWrapper(),
    });

    expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.WRONG_NETWORK, 'error');
  });
});
