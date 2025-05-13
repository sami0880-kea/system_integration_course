# Webhook System

A simple webhook system

## Event Types

The system supports the following event types:

- `payment.received`
- `payment.processed`
- `payment.failed`
- `payment.refunded`

## API Endpoints

### Register Webhook

```http
POST /webhooks/register
Content-Type: application/json

{
    "url": "https://[YOUR URL]/webhook",
    "events": ["payment.received"]
}
```

### Unregister Webhook

```http
DELETE /webhooks/unregister
Content-Type: application/json

{
    "url": "https:///<YOUR URL>/webhook"
}
```

### Ping Test

```http
GET /ping
```

This endpoint will trigger a test event to all registered webhooks.

## Webhook Payload Format

```json
{
  "data": {
    "event": "ping",
    "timestamp": "2025-05-13T20:47:42.641Z",
    "message": "This is a test ping event"
  }
}
```
