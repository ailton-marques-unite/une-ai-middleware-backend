# Campaigns Module

This module implements the Campaigns domain following Domain-Driven Design principles and the Vapi API specification.

## Architecture

The module follows a clean architecture pattern with clear separation of concerns:

```
src/campaigns/
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
- `GET /campaigns` - List all campaigns with filtering and pagination
- `POST /campaigns` - Create a new campaign
- `GET /campaigns/:id` - Get campaign by ID
- `PATCH /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign

## Query Parameters

The list endpoints support comprehensive filtering:

### Date Filtering
- `createdAtGt`, `createdAtLt`, `createdAtGe`, `createdAtLe`
- `updatedAtGt`, `updatedAtLt`, `updatedAtGe`, `updatedAtLe`

### Campaign Properties
- `status` - Filter by campaign status (draft, scheduled, running, etc.)
- `type` - Filter by campaign type (outbound, inbound, survey, etc.)
- `assistantId` - Filter by assistant ID
- `createdBy` - Filter by creator
- `campaignGroupId` - Filter by campaign group
- `name` - Filter by campaign name

### Pagination
- `limit` - Maximum number of results (default: 100, max: 1000)

## Campaign Entity Properties

### Core Properties
- `id` - Unique campaign identifier
- `orgId` - Organization identifier
- `name` - Campaign name
- `description` - Campaign description (optional)
- `status` - Current campaign status
- `type` - Campaign type
- `assistantId` - Associated assistant

### Timestamps
- `createdAt` - Campaign creation timestamp
- `updatedAt` - Last update timestamp
- `startedAt` - Campaign start timestamp (optional)
- `endedAt` - Campaign end timestamp (optional)

### Campaign Configuration
- `targets` - Array of campaign targets (optional)
- `schedule` - Campaign scheduling configuration (optional)
- `settings` - Campaign settings and preferences (optional)

### Metadata & Tracking
- `metadata` - Additional campaign metadata (optional)
- `tags` - Array of campaign tags (optional)
- `createdBy` - Creator identifier (optional)
- `updatedBy` - Last updater identifier (optional)
- `priority` - Campaign priority level (optional)
- `campaignGroupId` - Associated campaign group (optional)

### Metrics
- `metrics` - Campaign performance metrics (optional)

## Campaign Statuses

- `draft` - Campaign is in draft state
- `scheduled` - Campaign is scheduled to run
- `running` - Campaign is currently active
- `paused` - Campaign is temporarily paused
- `completed` - Campaign has finished
- `cancelled` - Campaign was cancelled

## Campaign Types

- `outbound` - Outbound calling campaign
- `inbound` - Inbound call handling campaign
- `survey` - Survey campaign
- `follow-up` - Follow-up campaign
- `promotional` - Promotional campaign

## Campaign Target Structure

Each campaign target includes:
- `id` - Target identifier
- `name` - Target name
- `phoneNumber` - Target phone number
- `email` - Target email (optional)
- `metadata` - Additional target metadata (optional)

## Campaign Schedule Configuration

Campaign scheduling supports:
- `startDate` - Campaign start date (optional)
- `endDate` - Campaign end date (optional)
- `timezone` - Timezone for scheduling (optional)
- `daysOfWeek` - Allowed days of the week (optional)
- `startTime` - Daily start time (optional)
- `endTime` - Daily end time (optional)
- `maxCallsPerDay` - Maximum calls per day (optional)
- `maxCallsPerHour` - Maximum calls per hour (optional)

## Campaign Settings

Campaign settings include:
- `maxRetries` - Maximum retry attempts (optional)
- `retryDelay` - Delay between retries (optional)
- `maxCallDuration` - Maximum call duration (optional)
- `recordCalls` - Whether to record calls (optional)
- `allowVoicemail` - Whether to allow voicemail (optional)
- `voicemailMessage` - Custom voicemail message (optional)
- `allowedTimeSlots` - Allowed time slots (optional)
- `blockedTimeSlots` - Blocked time slots (optional)

## Campaign Metrics

Performance metrics include:
- `totalTargets` - Total number of targets
- `callsAttempted` - Number of calls attempted
- `callsConnected` - Number of calls connected
- `callsCompleted` - Number of calls completed
- `callsFailed` - Number of failed calls
- `callsAnswered` - Number of answered calls
- `callsNoAnswer` - Number of no-answer calls
- `callsBusy` - Number of busy calls
- `totalDuration` - Total call duration
- `averageCallDuration` - Average call duration
- `successRate` - Success rate percentage
- `answerRate` - Answer rate percentage

## Features

- **Type Safety**: Full TypeScript support with proper interfaces
- **Validation**: Request/response validation using class-validator
- **Error Handling**: Proper HTTP status codes and error messages
- **Documentation**: Swagger/OpenAPI documentation
- **Testing**: Comprehensive unit tests for all layers
- **Dependency Injection**: Follows NestJS DI patterns
- **Repository Pattern**: Abstracted data access layer
- **Advanced Filtering**: Comprehensive query parameter support
- **Real API Integration**: HTTP client integration with Vapi API

## Usage

The module is automatically imported in the main AppModule and provides all the necessary endpoints for managing campaigns according to the Vapi API specification.

## Testing

Run the tests with:
```bash
npm run test
npm run test:watch
npm run test:cov
```

## Swagger Documentation

Once the application is running, visit `http://localhost:3000/api` to see the interactive API documentation for all campaign endpoints.

## Environment Variables

The module requires the following environment variables:
- `VAPI_API_URL` - Base URL for the Vapi API
- `VAPI_SECRET_KEY` - Secret key for API authentication
