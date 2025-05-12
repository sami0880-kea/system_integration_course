# Payment Integration with Stripe

This is a demo application that integrates with Stripe payment processing. It demonstrates a simple e-commerce flow with product catalog, checkout process, and payment confirmation.

## Features

- Product catalog with mock items
- Stripe Checkout integration
- Success and cancel pages
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Stripe account (free to create)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/integrate-payment.git
cd integrate-payment
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the project root:

```
STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=${STRIPE_PUBLIC_KEY}
```

Replace `your_public_key` and `your_secret_key` with your actual Stripe test API keys. You can find these in your [Stripe Dashboard](https://dashboard.stripe.com/apikeys).

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

1. The user browses the product catalog and selects an item
2. When they click "Proceed to Checkout", the application:
   - Makes an API call to `/api/create-checkout-session`
   - The server creates a Stripe Checkout Session
   - The user is redirected to Stripe's hosted checkout page
3. After payment completion (or cancellation), the user is redirected back to the application

## Testing the Payment

Stripe provides test card numbers for simulating different payment scenarios:

- Successful payment: `4242 4242 4242 4242`
- Payment requiring authentication: `4000 0025 0000 3155`
- Payment that will be declined: `4000 0000 0000 9995`

For all test cards, you can use:

- Any future expiration date
- Any 3-digit CVC
- Any postal code

## Notes on Implementation

- This implementation uses Stripe Checkout, which is the simplest integration option
- For more complex needs, you could implement Elements or Payment Intents API
- The application uses test mode - no real payments are processed

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
