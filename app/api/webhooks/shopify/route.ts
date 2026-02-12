import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Shopify webhook secret for HMAC verification
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

/**
 * Handle Shopify webhooks for product/collection updates
 * Triggers on-demand revalidation of affected pages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
    const topic = request.headers.get("x-shopify-topic");

    // Verify webhook signature
    const isValid = await verifyShopifyWebhook(body, hmacHeader);
    if (!isValid) {
      console.error("Invalid Shopify webhook signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Received Shopify webhook: ${topic}`);

    // Parse the webhook payload
    const payload = JSON.parse(body);

    // Handle different webhook topics
    switch (topic) {
      // Product events
      case "products/create":
      case "products/update":
      case "products/delete":
        await handleProductUpdate(payload);
        break;

      // Collection events
      case "collections/create":
      case "collections/update":
      case "collections/delete":
        await handleCollectionUpdate(payload);
        break;

      // Inventory updates
      case "inventory_levels/update":
        await handleInventoryUpdate(payload);
        break;

      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handle product create/update/delete
 */
async function handleProductUpdate(payload: { handle?: string }) {
  console.log("Product updated:", payload.handle);

  // Revalidate all collection pages since product could be in any collection
  revalidatePath("/shoes");
  revalidatePath("/shirts");
  revalidatePath("/"); // Homepage might show featured products
}

/**
 * Handle collection create/update/delete
 */
async function handleCollectionUpdate(payload: { handle?: string }) {
  console.log("Collection updated:", payload.handle);

  // Revalidate specific collection if we can identify it
  if (payload.handle === "shoes") {
    revalidatePath("/shoes");
  } else if (payload.handle === "shirts") {
    revalidatePath("/shirts");
  } else {
    // Revalidate all if we can't identify
    revalidatePath("/shoes");
    revalidatePath("/shirts");
  }
}

/**
 * Handle inventory level updates
 */
async function handleInventoryUpdate(payload: unknown) {
  console.log("Inventory updated:", payload);

  // Revalidate all product pages
  revalidatePath("/shoes");
  revalidatePath("/shirts");
}
