import { createAPIFileRoute } from "@tanstack/react-start/api";
import crypto from "crypto";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;

/**
 * Verify Shopify webhook signature using HMAC
 */
async function verifyShopifyWebhook(
  body: string,
  hmacHeader: string | null
): Promise<boolean> {
  if (!hmacHeader || !SHOPIFY_WEBHOOK_SECRET) {
    return false;
  }

  const generatedHash = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(body, "utf8")
    .digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(generatedHash),
    Buffer.from(hmacHeader)
  );
}

export const APIRoute = createAPIFileRoute("/api/webhooks/shopify")({
  POST: async ({ request }) => {
    try {
      const body = await request.text();
      const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
      const topic = request.headers.get("x-shopify-topic");

      // Verify webhook signature
      const isValid = await verifyShopifyWebhook(body, hmacHeader);
      if (!isValid) {
        console.error("Invalid Shopify webhook signature");
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log(`Received Shopify webhook: ${topic}`);

      // Parse the webhook payload
      const payload = JSON.parse(body);

      // Handle different webhook topics
      switch (topic) {
        case "products/create":
        case "products/update":
        case "products/delete":
          console.log("Product updated:", payload.handle);
          break;

        case "collections/create":
        case "collections/update":
        case "collections/delete":
          console.log("Collection updated:", payload.handle);
          break;

        case "inventory_levels/update":
          console.log("Inventory updated:", payload);
          break;

        default:
          console.log(`Unhandled webhook topic: ${topic}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
});
