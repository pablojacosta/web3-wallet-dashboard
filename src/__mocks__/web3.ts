import React, { ReactNode } from 'react';
import { vi } from 'vitest';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

const mockUseNetworkFn = vi.fn().mockReturnValue({
  chain: { id: 11155111 },
  chains: [{ id: 11155111, name: 'Sepolia' }],
});

vi.mock('viem', async () => {
  const actual = await vi.importActual<typeof import('viem')>('viem');
  return {
    ...actual,
    formatUnits: vi.fn().mockReturnValue('1.0'),
    parseUnits: vi.fn().mockReturnValue('1000000000000000000'),
    erc20Abi: [],
  };
});

vi.mock('wagmi', async () => {
  const actual = await vi.importActual<typeof import('wagmi')>('wagmi');
  return {
    ...actual,
    useAccount: vi.fn(),
    useConfig: vi.fn().mockReturnValue({
      chains: [],
      connectors: [],
      transports: {},
      ssr: true,
      storage: {},
      batch: { multicall: true },
    }),
    useReadContract: vi.fn().mockReturnValue({
      data: '1000000000000000000',
      refetch: vi.fn(),
      isLoading: false,
    }),
    useWriteContract: vi.fn().mockReturnValue({
      writeContract: vi.fn(),
      data: '0x123',
      isLoading: false,
    }),
    useWaitForTransactionReceipt: vi.fn().mockReturnValue({
      data: {
        status: 'success',
        transactionHash: '0x123',
      },
      isLoading: false,
    }),
    http: vi.fn(),
    createConfig: vi.fn(),
    cookieStorage: {},
    createStorage: vi.fn(),
    mock: vi.fn(),
    WagmiProvider: ({ children }: { children: ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

export const mockUseAccount = vi.mocked(useAccount);
export const mockUseReadContract = vi.mocked(useReadContract);
export const mockUseWriteContract = vi.mocked(useWriteContract);
export const mockUseWaitForTransactionReceipt = vi.mocked(useWaitForTransactionReceipt);

export const mockHookStates = {
  network: {
    sepolia: () =>
      mockUseNetworkFn.mockReturnValue({
        chain: { id: 11155111 },
      }),
    mainnet: () =>
      mockUseNetworkFn.mockReturnValue({
        chain: { id: 1 },
      }),
    none: () =>
      mockUseNetworkFn.mockReturnValue({
        chain: undefined,
      }),
  },
  contract: {
    read: {
      success: (value = '1000000000000000000') =>
        (mockUseReadContract as ReturnType<typeof vi.fn>).mockReturnValue({
          data: value,
          refetch: vi.fn(),
          isLoading: false,
        }),
      loading: () =>
        (mockUseReadContract as ReturnType<typeof vi.fn>).mockReturnValue({
          data: undefined,
          refetch: vi.fn(),
          isLoading: true,
        }),
      error: (error: Error) =>
        (mockUseReadContract as ReturnType<typeof vi.fn>).mockReturnValue({
          data: undefined,
          refetch: vi.fn(),
          isLoading: false,
          error,
        }),
    },
    write: {
      success: (hash = '0x123') =>
        (mockUseWriteContract as ReturnType<typeof vi.fn>).mockReturnValue({
          writeContract: vi.fn().mockResolvedValue(hash),
          data: hash,
          isLoading: false,
        }),
      loading: () =>
        (mockUseWriteContract as ReturnType<typeof vi.fn>).mockReturnValue({
          writeContract: vi.fn(),
          data: undefined,
          isLoading: true,
        }),
      error: (error: Error) =>
        (mockUseWriteContract as ReturnType<typeof vi.fn>).mockReturnValue({
          writeContract: vi.fn().mockRejectedValue(error),
          data: undefined,
          isLoading: false,
          error,
        }),
    },
  },
};

export interface EventStoreMock {
  addEvent: (event: {
    type: string;
    token: string;
    amount: string;
    sender: string;
    recipient: string;
    hash: string;
  }) => void;
}

export const createEventStoreMock = (addEvent = vi.fn()): EventStoreMock => ({
  addEvent,
});
