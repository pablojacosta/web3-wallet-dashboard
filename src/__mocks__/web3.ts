import React, { ReactNode } from 'react';
import { vi } from 'vitest';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

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
