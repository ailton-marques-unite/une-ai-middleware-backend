# Calls Module

This module implements the Calls domain following Domain-Driven Design principles and the Vapi API specification.

## Architecture

The module follows a clean architecture pattern with clear separation of concerns:

```
src/calls/
├── domain/
│   ├── entities/           # Core business entities
│   └── repositories/       # Repository interfaces
├── application/
│   ├── dtos/              # Data Transfer Objects
│   └── services/          # Application services
└── infrastructure/
    ├── controllers/       # HTTP controllers
    └── repositories/      # Repository implementations
```

## API Endpoints

### Core CRUD Operations
- `GET /calls` - List all calls with filtering and pagination
- `POST /calls` - Create a new call
- `GET /calls/:id` - Get call by ID
- `PATCH /calls/:id` - Update call
- `DELETE /calls/:id` - Delete call

### Specialized Endpoints
- `GET /calls/assistant/:assistantId` - Get calls by assistant ID
- `GET /calls/customer/:customerId` - Get calls by customer ID
- `GET /calls/status/:status` - Get calls by status

## Query Parameters

The list endpoints support comprehensive filtering:

### Date Filtering
- `createdAtGt`, `createdAtLt`, `createdAtGe`, `createdAtLe`
- `updatedAtGt`, `updatedAtLt`, `updatedAtGe`, `updatedAtLe`

### Call Properties
- `status` - Filter by call status (queued, ringing, in-progress, etc.)
- `type` - Filter by call type (inbound, outbound)
- `assistantId` - Filter by assistant ID
- `customerId` - Filter by customer ID
- `customerPhoneNumber` - Filter by customer phone number
- `campaignId` - Filter by campaign ID
- `sessionId` - Filter by session ID

### Pagination
- `limit` - Maximum number of results (default: 100, max: 1000)

## Call Entity Properties

### Core Properties
- `id` - Unique call identifier
- `orgId` - Organization identifier
- `status` - Current call status
- `type` - Call type (inbound/outbound)
- `assistantId` - Associated assistant
- `customerId` - Customer identifier (optional)
- `customerPhoneNumber` - Customer's phone number (optional)
- `assistantPhoneNumber` - Assistant's phone number (optional)

### Timestamps
- `createdAt` - Call creation timestamp
- `updatedAt` - Last update timestamp
- `startedAt` - Call start timestamp (optional)
- `endedAt` - Call end timestamp (optional)

### Call Data
- `duration` - Call duration in seconds (optional)
- `endReason` - Reason for call termination (optional)
- `messages` - Array of call messages (optional)
- `recording` - Call recording information (optional)
- `analysis` - Call analysis data (optional)
- `transcript` - Call transcript (optional)

### Metadata & Costs
- `metadata` - Additional call metadata (optional)
- `cost` - Call cost (optional)
- `costCurrency` - Currency for cost (optional)
- `tags` - Array of call tags (optional)
- `campaignId` - Associated campaign (optional)
- `sessionId` - Associated session (optional)

## Call Statuses

- `queued` - Call is queued for processing
- `ringing` - Call is ringing
- `in-progress` - Call is active
- `forwarding` - Call is being forwarded
- `ended` - Call has ended normally
- `busy` - Call failed due to busy line
- `failed` - Call failed for other reasons
- `no-answer` - Call failed due to no answer
- `canceled` - Call was canceled

## Call Types

- `inbound` - Incoming call
- `outbound` - Outgoing call

## Features

- **Type Safety**: Full TypeScript support with proper interfaces
- **Validation**: Request/response validation using class-validator
- **Error Handling**: Proper HTTP status codes and error messages
- **Documentation**: Swagger/OpenAPI documentation
- **Testing**: Comprehensive unit tests for all layers
- **Dependency Injection**: Follows NestJS DI patterns
- **Repository Pattern**: Abstracted data access layer
- **Advanced Filtering**: Comprehensive query parameter support

## Usage

The module is automatically imported in the main AppModule and provides all the necessary endpoints for managing calls according to the Vapi API specification.

## Testing

Run the tests with:
```bash
npm run test
npm run test:watch
npm run test:cov
```

## Swagger Documentation

Once the application is running, visit `http://localhost:3000/api` to see the interactive API documentation for all call endpoints.
