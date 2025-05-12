"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, Theme } from "@radix-ui/themes";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Product",
          price: 100.0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Theme appearance="light" accentColor="purple">
      <div className="min-h-screen p-8">
        <header className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-3xl font-bold mb-2">Payment Integration</h1>
        </header>

        <main className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <Button
              size="3"
              variant="solid"
              onClick={handleCheckout}
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </span>
              ) : (
                "Checkout with Stripe"
              )}
            </Button>
          </div>
        </main>
      </div>
    </Theme>
  );
}
