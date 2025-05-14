import axios from "axios";

const EXPOSEE_WEBHOOK_SERVER =
  "https://systemintegration-webhook-demo.onrender.com";
const INTEGRATOR_WEBHOOK_URL =
  "https://system-integration-course.fly.dev/webhooks/payments";

async function registerWebhook() {
  try {
    const response = await axios.post(
      `${EXPOSEE_WEBHOOK_SERVER}/api/webhooks`,
      {
        url: INTEGRATOR_WEBHOOK_URL,
        event_type: "payment.processed",
      }
    );

    console.log("Webhook registration response:", response.data);

    const pingResponse = await axios.get(`${EXPOSEE_WEBHOOK_SERVER}/api/ping`);
    console.log("Ping test response:", pingResponse.data);

    const simulateResponse = await axios.post(
      `${EXPOSEE_WEBHOOK_SERVER}/api/simulate`,
      {
        event_type: "payment.processed",
      }
    );
    console.log("Simulation response:", simulateResponse.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

registerWebhook();
