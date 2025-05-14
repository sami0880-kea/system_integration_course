import axios from "axios";

const EXPOSEE_WEBHOOK_SERVER =
  "https://systemintegration-webhook-demo.onrender.com";
const INTEGRATOR_WEBHOOK_URL =
  "https://system-integration-course.fly.dev/webhooks/payments";

async function deleteWebhook() {
  try {
    const response = await axios.delete(
      `${EXPOSEE_WEBHOOK_SERVER}/api/webhooks`,
      {
        data: {
          url: INTEGRATOR_WEBHOOK_URL,
          event_type: "payment.processed",
        },
      }
    );
    console.log("Webhook deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting webhook:", error);
  }
}

deleteWebhook();
