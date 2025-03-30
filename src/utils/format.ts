import { ETransactionType } from '~/enums';

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getEventTypeTitle = (eventType: ETransactionType) => {
  return eventType === ETransactionType.TRANSFER ? 'Transfer' : 'Approve';
};
