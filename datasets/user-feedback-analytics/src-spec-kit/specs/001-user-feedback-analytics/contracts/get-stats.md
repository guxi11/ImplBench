# Contract: GET /api/stats (Extended)

Dashboard statistics including feedback metrics.

## Request

```
GET /api/stats
```

## Response 200

```json
{
  "totalUsers": 1284,
  "activeUsers": 967,
  "newUsersToday": 12,
  "newUsersThisWeek": 84,
  "feedbackPending": 5,
  "feedbackTotal": 15,
  "feedbackResolvedToday": 2
}
```

## New Fields

| Field | Type | Description |
|-------|------|-------------|
| feedbackPending | number | Count where status === "pending" |
| feedbackTotal | number | Total feedback count |
| feedbackResolvedToday | number | Count where status === "resolved" AND updatedAt is today |

## Behavior

- "Today" is determined by server UTC date
- Existing fields remain unchanged
- All feedback counts are computed at request time from the mock array
