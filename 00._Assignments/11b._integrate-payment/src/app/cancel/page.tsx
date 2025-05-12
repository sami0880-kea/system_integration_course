"use client";

import Link from "next/link";
import { Theme, Heading, Text, Button } from "@radix-ui/themes";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <Theme appearance="light" accentColor="purple">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="p-8 max-w-md w-full text-center">
          <div className="flex flex-col items-center gap-4">
            <XCircle size={64} className="text-red-500" strokeWidth={1.5} />

            <Heading size="6" trim="both">
              Payment Canceled
            </Heading>

            <Text color="gray" size="3" className="mb-2">
              Your payment was canceled.
            </Text>

            <Button asChild size="3" variant="soft">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Theme>
  );
}
