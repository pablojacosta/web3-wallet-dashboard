# Wallet Dashboard

A modern web3 dashboard built with Next.js, TypeScript, and Material-UI that allows users to interact with ERC20 tokens (DAI and USDC). The application provides functionality for token transfers, approvals, minting, and tracking transaction history.

## Features

- 🔐 Wallet Connection (using RainbowKit)
- 💰 Token Management
  - View token balances
  - Transfer tokens
  - Approve token spending
  - Mint tokens (for testing purposes)
  - Check token allowance for a specific spender
- 🌐 Network Management
  - Automatic network detection
  - Chain switching capability
  - Support for multiple networks (Sepolia, Mainnet)
  - Network validation and feedback
- 📊 Transaction History
  - Real-time transaction tracking
  - Persistent storage of transaction events
- 🎨 Modern UI/UX
  - Responsive design
  - Loading states
  - Error handling
  - Transaction feedback

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Material-UI (MUI)
- **Web3**:
  - Wagmi (Ethereum interactions)
  - RainbowKit (Wallet connection)
  - Viem (Ethereum utilities)
- **State Management**:
  - Zustand (Application state)
  - Persisted storage for transaction history
- **Code Quality**:
  - ESLint
  - Prettier
- **Testing**:
  - Vitest
  - React Testing Library

## Project Structure

```
src/
├── components/
│ ├── Dashboard/ # Main dashboard components
│ │ └── components/
│ │ ├── EventTable/ # Transaction history table
│ │ ├── Toggle/ # Toggle component
│ │ └── TokenCard/ # Token management card
│ ├── Modal/ # Modal components
│ └── Shared/ # Reusable components
├── config/ # Config files
├── containers/ # Layout components
├── enums/ # TypeScript enums
├── hooks/ # Custom React hooks
├── pages/ # Pages
├── providers/ # Providers
├── store/ # Zustand stores
├── types/ # TypeScript types
└── utils/ # Utility functions
```

## Key Components

### TokenCard

Manages individual token interactions including:

- Balance display
- Transfer functionality
- Approval management
- Minting capability

### EventTable

Displays transaction history with:

- Transaction type
- Token information
- Amount
- Sender/Recipient addresses
- Transaction hash

## Custom Hooks

### useTokenContract

Central hook for token interactions:

- Token balance queries
- Allowance checking
- Transfer execution
- Approval management
- Minting functionality

### useTransactionHandler

Manages transaction execution and error handling:

- Transaction execution
- Error processing
- Success/failure notifications

### useNetworkCheck

Manages network validation and switching:

- Automatic network detection
- Chain switching functionality
- Error handling for network changes
- User feedback through modals

## State Management

### useEventStore

Persists transaction history:

- Stores transaction events
- Survives page reloads
- Filters by transaction type

### useModalStore

Manages modal states for:

- Transaction feedback
- Error messages
- Loading states

## Testing

The application includes comprehensive test coverage:

### Unit Tests

- Custom hooks testing

  - `useTokenContract`: Token operations and state management
  - `useNetworkCheck`: Network validation and switching
  - `useTransactionHandler`: Transaction execution and error handling

- Component testing
  - `Allowance`: Allowance section
  - `Balance`: Balance section
  - `Dashboard`: Dashboard component
  - `EventTable`: Transaction history display
  - `Mint`: Minting section
  - `Modal`: User feedback and notifications
  - `Toggle`: Toggle component
  - `TokenCard`: Token management functionality
  - `Transaction`: User feedback and notifications

### Test Structure

```
src/tests/
├── components/ # Component tests
│ ├── Allowance.test.tsx
│ ├── Balance.test.tsx
│ ├── Dashboard.test.tsx
│ ├── EventTable.test.tsx
│ ├── Mint.test.tsx
│ ├── Modal.test.tsx
│ ├── Toggle.test.tsx
│ ├── TokenCard.test.tsx
│ └── Transaction.test.tsx
└── hooks/ # Hook tests
├── useTokenContract.test.tsx
├── useNetworkCheck.test.tsx
└── useTransactionHandler.test.tsx
```

### Test Coverage

- Component rendering and interactions
- Hook state management
- Error handling scenarios
- Network validation
- Transaction processing
- User input validation
- Modal state management

### Running Tests

```bash
# Run all tests
yarn test
```

### Test Environment

- Vitest for test runner
- React Testing Library for component testing
- Mock implementations for web3 interactions

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_PROJECT_ID`

4. Run the development server:

```bash
yarn run dev
```

## Usage

1. Connect your wallet using the RainbowKit button
2. The app will automatically detect and validate your network
3. If on an unsupported network, you'll be switched automatically to Sepolia
4. Select a token (DAI or USDC) to interact with
5. Use the token card to:
   - Check your balance
   - Transfer tokens
   - Approve token spending
   - Mint tokens (test only, with validation for min/max limits)
   - Check token allowance
6. View your transaction history in the event table

## Error Handling

The application handles various error scenarios:

- Invalid addresses
- Insufficient funds
- Transaction rejections
- Network errors
- Contract interaction failures
- Network validation errors
- Chain switching failures
- Unsupported network detection
- Minting validation errors:
  - Maximum mint limit exceeded
  - Minimum mint amount not met
  - Invalid mint amount (negative or zero)
  - Empty mint amount

## Best Practices

- TypeScript for type safety
- Component-based architecture
- Custom hooks for reusable logic
- Centralized state management
- Persistent storage for user data
- Responsive design principles
- Loading state management
- Error boundary implementation

Pablo Acosta - 2025
