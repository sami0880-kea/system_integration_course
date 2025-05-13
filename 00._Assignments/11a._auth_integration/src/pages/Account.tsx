import { Container, Heading, Text, Avatar, Spinner } from "@radix-ui/themes";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

export const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <Spinner size="3" />
            Loading...
          </div>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar
          src={user?.picture}
          fallback={user?.name?.[0] || "?"}
          size="6"
          className="rounded-full"
        />
        <div>
          <Heading size="6">{user?.name}</Heading>
          <Text size="3" className="text-gray-500">
            {user?.email}
          </Text>
        </div>
      </div>
      <div className="bg-[#0d0d0f] p-6 rounded-lg shadow-sm">
        <Heading size="4" className="mb-4">
          Account Information
        </Heading>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Text className="flex flex-row gap-1">
              <span className="font-bold text-white">Email status: </span>
              <span className="flex items-center gap-1">
                {user?.email_verified ? (
                  <>
                    Verified{" "}
                    <CheckCircle2 className="inline-block w-5 h-5 text-green-500" />
                  </>
                ) : (
                  <>
                    Not verified{" "}
                    <XCircle className="inline-block w-5 h-5 text-red-500" />
                  </>
                )}
              </span>
            </Text>
          </div>
          <Text>
            <span className="font-bold text-white">Last updated:</span>{" "}
            {new Date().toLocaleDateString()}
          </Text>
        </div>
      </div>
    </Container>
  );
};
