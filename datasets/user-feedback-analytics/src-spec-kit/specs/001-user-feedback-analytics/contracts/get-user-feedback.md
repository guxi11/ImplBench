# Contract: GET /api/users/[id]/feedback

All feedback submitted by a specific user.

## Request

```
GET /api/users/{userId}/feedback
```

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
  ]
}
```

## Behavior

- Returns empty array `[]` for users with no feedback (not 404)
- No pagination (returns all feedback for the user)
- Does not validate whether userId exists as a User
