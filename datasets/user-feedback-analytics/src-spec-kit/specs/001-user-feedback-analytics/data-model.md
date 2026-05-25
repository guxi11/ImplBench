# Data Model: User Feedback Analytics

## Entities

### Feedback

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | `string` | Unique, format `fb-xxx` | Primary identifier |
| userId | `string` | FK → User.id | Submitting user |
| type | `FeedbackType` | Enum | Category of feedback |
| title | `string` | Non-empty | Brief summary |
| content | `string` | Non-empty | Full description |
| status | `FeedbackStatus` | Enum | Processing state |
| createdAt | `string` | ISO 8601 | Submission timestamp |
| updatedAt | `string` | ISO 8601 | Last modification timestamp |

### User (existing — no changes)

| Field | Type | Description |
|-------|------|-------------|
| id | `string` | Format `u-xxx` |
| name | `string` | Display name |
| email | `string` | Contact |
| avatar | `string` | URL |
| status | `"active" \| "inactive" \| "suspended"` | Account state |
| registeredAt | `string` | ISO 8601 |
| lastActiveAt | `string` | ISO 8601 |

## Enumerations

### FeedbackType

```typescript
type FeedbackType = "bug" | "feature_request" | "complaint" | "suggestion"
```

### FeedbackStatus

```typescript
type FeedbackStatus = "pending" | "in_progress" | "resolved" | "dismissed"
```

## Relationships

```
User (1) ──── (N) Feedback
  via Feedback.userId → User.id
```

## State Machine: FeedbackStatus

```
                ┌──────────────┐
                │   pending    │
                └──────┬───────┘
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
    ┌───────────────┐     ┌─────────────┐
    │  in_progress  │     │  dismissed  │
    └───────┬───────┘     └──────┬──────┘
            │                    │
     ┌──────┴──────┐            │
     ▼             ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ resolved │ │ dismissed│ │ pending  │
└──────────┘ └──────────┘ └──────────┘
  (terminal)               (reopen)
```

**Transitions**:
- `pending` → `in_progress` | `dismissed`
- `in_progress` → `resolved` | `dismissed`
- `resolved` → (none, terminal)
- `dismissed` → `pending` (reopen)

## Computed/Derived Data

### Stats Extension

| Field | Derivation |
|-------|-----------|
| feedbackPending | `count(feedback where status === "pending")` |
| feedbackTotal | `count(feedback)` |
| feedbackResolvedToday | `count(feedback where status === "resolved" AND updatedAt is today)` |

### User Feedback Count

Derived at query time: `count(feedback where userId === user.id)`
