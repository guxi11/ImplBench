# Contract: GET /api/feedback

Paginated, filterable list of feedback items.

## Request

```
GET /api/feedback?status={FeedbackStatus}&type={FeedbackType}&page={number}&pageSize={number}
```

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| status | FeedbackStatus | No | — | Filter by status |
| type | FeedbackType | No | — | Filter by type |
| page | number | No | 1 | Page number (1-indexed) |
| pageSize | number | No | 10 | Items per page |

## Response 200

```json
{
  "feedback": [
    {
      "id": "fb-001",
      "userId": "u-001",
      "type": "bug",
      "title": "Login button unresponsive",
      "content": "...",
      "status": "pending",
      "createdAt": "2026-05-10T09:00:00Z",
      "updatedAt": "2026-05-10T09:00:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "pageSize": 10
}
```

## Behavior

- Filters are AND-combined (status + type both apply)
- `total` reflects count after filtering (not total in DB)
- Empty filter values are ignored (treated as "all")
- Invalid enum values are silently ignored (no error, return unfiltered)
