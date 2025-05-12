"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Theme, Heading, Text, Button } from "@radix-ui/themes";
import { CheckCircle, Loader2 } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState<{ status: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => {
        setOrderDetails({ status: "success" });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <Theme appearance="light" accentColor="purple">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 mx-auto text-purple-600 mb-4" />
            <Heading size="6" trim="both">
              Processing your order...
            </Heading>
          </div>
        </div>
      </Theme>
    );
  }

  if (!sessionId || !orderDetails) {
    return (
      <Theme appearance="light" accentColor="purple">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="p-8 max-w-md w-full text-center">
            <div className="flex flex-col items-center gap-4">
              <Heading size="6" trim="both">
                Invalid payment session
              </Heading>
              <Button asChild size="3" variant="soft">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </Theme>
    );
  }

  return (
    <Theme appearance="light" accentColor="purple">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center gap-4">
            <CheckCircle
              size={64}
              className="text-green-500"
              strokeWidth={1.5}
            />

            <Heading size="6" trim="both">
              Payment Successful
            </Heading>

            <Text color="gray" size="3">
              Thank you for your purchase
            </Text>

            <Text size="1" className="text-gray-400 mb-2">
              Order ID: {sessionId}
            </Text>

            <Button asChild size="3" variant="soft">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Theme>
  );
}
