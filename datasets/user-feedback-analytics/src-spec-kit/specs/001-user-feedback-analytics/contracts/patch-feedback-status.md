# Contract: PATCH /api/feedback/[id]

Update feedback processing status.

## Request

```
PATCH /api/feedback/{id}
Content-Type: application/json

{
  "status": "in_progress"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| status | FeedbackStatus | Yes | New status value |

## Response 200

```json
{
  "feedback": {
    "id": "fb-001",
    "userId": "u-001",
    "type": "bug",
    "title": "Login button unresponsive",
    "content": "...",
    "status": "in_progress",
    "createdAt": "2026-05-10T09:00:00Z",
    "updatedAt": "2026-05-26T12:00:00Z"
  }
}
```

`updatedAt` is set to current server time on successful update.

## Response 404

```json
{
  "error": "Feedback not found"
}
```

## Response 400

```json
{
  "error": "Invalid status"
}
```

Returned when `status` value is not one of: `pending`, `in_progress`, `resolved`, `dismissed`.
