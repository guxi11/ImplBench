# Contract: GET /api/feedback/[id]

Single feedback item by ID.

## Request

```
GET /api/feedback/{id}
```

## Response 200

```json
{
  "feedback": {
    "id": "fb-001",
    "userId": "u-001",
    "type": "bug",
    "title": "Login button unresponsive",
    "content": "When clicking the login button on mobile Safari, nothing happens...",
    "status": "pending",
    "createdAt": "2026-05-10T09:00:00Z",
    "updatedAt": "2026-05-10T09:00:00Z"
  }
}
```

## Response 404

```json
{
  "error": "Feedback not found"
}
```
