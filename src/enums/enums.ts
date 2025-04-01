export enum EErrorMessage {
  INSUFFICIENT_FUNDS = 'Insufficient funds for gas fee.',
  TRANSACTION_REJECTED = 'Transaction rejected by user.',
  TRANSACTION_FAILED = 'Transation failed. Please try again.',
  INVALID_SPENDER = 'Invalid spender address.',
  INVALID_RECIPIENT = 'Invalid recipient address.',
  NO_MINT_AMOUNT = 'Please enter a mint amount.',
  NO_VALID_AMOUNT = 'Please enter a valid positive amount.',
  INSUFFICIENT_ALLOWANCE = 'Insufficient allowance. Please approve first.',
  WRONG_NETWORK = 'Mainnet is not supported. Switching to Sepolia.',
  UNKNOWN_NETWORK_ERROR = 'Something went wrong. Please try again with Sepolia.',
  MAX_MINTS_ERROR = 'Minting limit reached! You can mint up to 100 tokens per transaction.',
  MIN_MINTS_ERROR = 'Minting limit not met! You must mint at least 0.01 token per transaction.',
}

export enum EMessageStatus {
  ERROR = 'error',
  SUCCESS = 'success',
  LOADING = 'loading',
}

export enum ESuccessMessage {
  TRANSFER = 'Transfer successful!',
  APPROVE = 'Approval successful!',
  MINT = 'Minting successful!',
  IN_PROGRESS = 'Transaction in progress...',
}

export enum ETokenType {
  DAI = 'DAI',
  USDC = 'USDC',
}

export enum ETransactionErrors {
  INSUFFICIENT_FUNDS = 'insufficient funds',
  TRANSACTION_REJECTED = 'user rejected',
  INSUFFICIENT_ALLOWANCE = 'insufficient allowance',
}

export enum ETransactionType {
  TRANSFER = 'transfer',
  APPROVE = 'approve',
}
