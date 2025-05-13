import { Container, Heading, Text } from "@radix-ui/themes";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Container className="py-8">
      <Heading size="8" className="mb-4">
        Welcome to Auth Integration
      </Heading>
      <Text size="5" className="text-gray-300">
        {isAuthenticated ? "You're logged in!" : "You're not logged in!"}
      </Text>
    </Container>
  );
};
