const CANNED_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ['subscription', 'subscribe', 'plan', 'upgrade', 'downgrade', 'cancel'],
    response:
      'Subscriptions are managed through the Unified Commerce Service. A subscription can be in states: active, suspended, cancelled, or pending. To modify a subscription, use the /subscriptions/{subscriptionId} endpoint. Cancellations take effect at the end of the current billing period unless an immediate cancel flag is passed.',
  },
  {
    keywords: ['payment', 'billing', 'invoice', 'charge', 'refund', 'transaction'],
    response:
      'Payments are processed via the billing service. Invoices are generated at the start of each billing cycle. If a payment fails, the system retries 3 times over 7 days before suspending the subscription. Refunds can be issued within 30 days of a charge and are processed back to the original payment method within 5–10 business days.',
  },
  {
    keywords: ['order', 'cart', 'checkout', 'purchase', 'quote'],
    response:
      'Orders flow through the quote-to-cart-to-checkout pipeline. A quote is created, items are added to a cart, and checkout completes the purchase. Quotes expire after 30 days. If a checkout fails mid-flow, the cart state is preserved and the user can retry without losing their selections.',
  },
  {
    keywords: ['error', 'issue', 'bug', 'fail', 'broken', 'not working', 'problem'],
    response:
      'For service errors, check the Unified Commerce Service logs first — most issues surface there as 4xx or 5xx responses with a structured error body containing a `code` and `message`. Common issues: auth token expiry (401), account not found (404), and rate limiting (429). If the issue is intermittent, check for upstream dependency health in the service mesh dashboard.',
  },
  {
    keywords: ['user', 'account', 'customer', 'profile', 'seat'],
    response:
      'User accounts are managed at the account-key level. Each account can have multiple users with different roles (admin, member, viewer). Seat counts are tied to subscription line items. To look up a user, query /accounts/{accountKey}/users. Care Reps have read-only access by default; write operations require elevated permissions.',
  },
  {
    keywords: ['feature', 'product', 'addon', 'bundle', 'entitlement'],
    response:
      'Product entitlements are evaluated at runtime based on the active subscription line items. Feature flags (via Unleash) can override entitlements for specific accounts during rollouts. If a feature is not showing for a customer despite an active subscription, first verify the entitlement mapping in the product catalog, then check for any active feature flag overrides on the account.',
  },
];

const DEFAULT_RESPONSE =
  "I don't have specific information on that, but I can help with subscriptions, payments, orders, user accounts, product features, and service errors. Try asking a more specific question or include keywords related to your issue.";

const findResponse = (message: string): string => {
  const lower = message.toLowerCase();
  for (const { keywords, response } of CANNED_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }
  return DEFAULT_RESPONSE;
};

export const chatDao = {
  sendMessage: (content: string): Promise<string> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(findResponse(content)), 1500);
    }),
};
