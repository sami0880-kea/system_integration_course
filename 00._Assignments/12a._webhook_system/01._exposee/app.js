import express from "express";
import axios from "axios";
import connection from "./database/connection.js";

const app = express();

app.use(express.json());

const EVENTS = [
  "payment.received",
  "payment.processed",
  "payment.failed",
  "payment.refunded",
];

app.post("/webhooks/register", (req, res) => {
  const { url, events } = req.body;

  if (!url || !events || !Array.isArray(events)) {
    return res
      .status(400)
      .send({ error: "Invalid request. URL and events array required." });
  }

  const invalidEvents = events.filter(event => !EVENTS.includes(event));
  if (invalidEvents.length > 0) {
    return res.status(400).send({
      error: "Invalid event types",
      invalidEvents,
    });
  }

  const sql = "INSERT INTO webhooks (url, events) VALUES (?, ?)";
  connection.run(sql, [url, JSON.stringify(events)], function (err) {
    if (err) {
      console.error("Error registering webhook:", err);
      return res.status(500).send({ error: "Failed to register webhook" });
    }
    res.status(201).send({
      data: {
        id: this.lastID,
        url,
        events,
        message: "Webhook registered successfully",
      },
    });
  });
});

app.delete("/webhooks/unregister", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: "URL is required" });
  }

  const sql = "DELETE FROM webhooks WHERE url = ?";
  connection.run(sql, [url], function (err) {
    if (err) {
      console.error("Error unregistering webhook:", err);
      return res.status(500).send({ error: "Failed to unregister webhook" });
    }
    if (this.changes === 0) {
      return res.status(404).send({ error: "Webhook not found" });
    }
    res.send({ message: "Webhook unregistered successfully" });
  });
});

app.get("/ping", (req, res) => {
  const testEvent = {
    data: {
      event: "ping",
      timestamp: new Date().toISOString(),
      message: "This is a test ping event",
    },
  };

  connection.all("SELECT * FROM webhooks", [], async (err, webhooks) => {
    if (err) {
      console.error("Error fetching webhooks:", err);
      return res.status(500).send({ error: "Failed to fetch webhooks" });
    }

    const results = [];
    for (const webhook of webhooks) {
      try {
        await axios.post(webhook.url, testEvent);
        results.push({
          url: webhook.url,
          status: "success",
        });
      } catch (error) {
        results.push({
          url: webhook.url,
          status: "failed",
          error: error.message,
        });
      }
    }

    res.send({
      message: "Ping event sent to all webhooks",
      results,
    });
  });
});

app.get("/webhooks", (req, res) => {
  connection.all("SELECT * FROM webhooks", [], (err, webhooks) => {
    if (err) {
      console.error("Error fetching webhooks:", err);
      return res.status(500).send({ error: "Failed to fetch webhooks" });
    }
    res.send(
      webhooks.map(webhook => ({
        ...webhook,
        events: JSON.parse(webhook.events),
      }))
    );
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook system running on port`, PORT));
