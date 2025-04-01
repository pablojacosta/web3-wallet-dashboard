import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mockHookStates } from '~/__mocks__/web3';
import { EErrorMessage, EMessageStatus, ETokenType } from '~/enums';
import { useTokenContract } from '~/hooks/useTokenContract';
import { useModalStore } from '~/store/useModalStore';

vi.mock('~/store/useWalletStore', () => ({
  useWalletStore: vi.fn().mockReturnValue({
    address: '0x1234567890123456789012345678901234567890',
  }),
}));

vi.mock('~/store/useModalStore', () => ({
  useModalStore: vi.fn().mockReturnValue({
    setShowModal: vi.fn(),
  }),
}));

vi.mock('~/store/useEventStore', () => ({
  useEventStore: vi.fn().mockReturnValue({
    addEvent: vi.fn(),
  }),
}));

describe('useTokenContract', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890';

  describe('balance operations', () => {
    it('returns formatted balance successfully', () => {
      mockHookStates.contract.read.success('1000000000000000000');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      expect(result.current.formattedBalance).toBe('1.0');
      expect(result.current.isLoadingBalance).toBe(false);
    });

    it('handles loading state', () => {
      mockHookStates.contract.read.loading();

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      expect(result.current.isLoadingBalance).toBe(true);
    });

    it('returns zero balance on error', () => {
      mockHookStates.contract.read.error(new Error('Failed to fetch balance'));

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      expect(result.current.balance).toBe('0');
    });
  });

  describe('transfer operations', () => {
    it('handles transfer successfully', async () => {
      mockHookStates.contract.write.success('0xtxhash');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.transfer(mockAddress, '100');
      expect(result.current.isTransferring).toBe(false);
    });

    it('validates recipient address before transfer', async () => {
      const mockSetShowModal = vi.fn();
      vi.mocked(useModalStore).mockReturnValue({
        setShowModal: mockSetShowModal,
      });

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.transfer('invalid-address', '100');
      expect(mockSetShowModal).toHaveBeenCalled();
    });
  });

  describe('approve operations', () => {
    it('handles approve successfully', async () => {
      mockHookStates.contract.write.success('0xtxhash');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.approve(mockAddress, '100');
      expect(result.current.isApproving).toBe(false);
    });

    it('validates spender address before approve', async () => {
      const mockSetShowModal = vi.fn();
      vi.mocked(useModalStore).mockReturnValue({
        setShowModal: mockSetShowModal,
      });

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.approve('invalid-address', '100');
      expect(mockSetShowModal).toHaveBeenCalled();
    });
  });

  describe('mint operations', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('handles mint successfully', async () => {
      mockHookStates.contract.write.success('0xtxhash');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.mint(mockAddress, '100');
      expect(result.current.isMinting).toBe(false);
    });

    it('validates recipient address before mint', async () => {
      const mockSetShowModal = vi.fn();
      vi.mocked(useModalStore).mockReturnValue({
        setShowModal: mockSetShowModal,
      });

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.mint('invalid-address', '100');
      expect(mockSetShowModal).toHaveBeenCalled();
    });

    it('validates amount before mint', async () => {
      const mockSetShowModal = vi.fn();
      vi.mocked(useModalStore).mockReturnValue({
        setShowModal: mockSetShowModal,
      });

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      // Test empty amount
      result.current.mint(mockAddress, '');
      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.NO_MINT_AMOUNT, EMessageStatus.ERROR);

      mockSetShowModal.mockClear();

      // Test negative amount
      result.current.mint(mockAddress, '-1');
      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.NO_VALID_AMOUNT, EMessageStatus.ERROR);

      mockSetShowModal.mockClear();

      // Test amount exceeding max limit
      result.current.mint(mockAddress, '101');
      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.MAX_MINTS_ERROR, EMessageStatus.ERROR);

      mockSetShowModal.mockClear();

      // Test amount below min limit
      result.current.mint(mockAddress, '0.001');
      expect(mockSetShowModal).toHaveBeenCalledWith(true, EErrorMessage.MIN_MINTS_ERROR, EMessageStatus.ERROR);
    });
  });

  describe('allowance operations', () => {
    it('checks allowance successfully', () => {
      mockHookStates.contract.read.success('1000000000000000000');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.checkAllowance(mockAddress);
      expect(result.current.formattedAllowance).toBe('1.0');
      expect(result.current.isLoadingAllowance).toBe(false);
    });

    it('validates spender address before checking allowance', () => {
      const mockSetShowModal = vi.fn();
      vi.mocked(useModalStore).mockReturnValue({
        setShowModal: mockSetShowModal,
      });

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.checkAllowance('invalid-address');
      expect(mockSetShowModal).toHaveBeenCalled();
    });

    it('handles mint successfully within limits', async () => {
      mockHookStates.contract.write.success('0xtxhash');

      const { result } = renderHook(() => useTokenContract(ETokenType.DAI));

      result.current.mint(mockAddress, '10');
      expect(result.current.isMinting).toBe(false);
    });
  });
});
