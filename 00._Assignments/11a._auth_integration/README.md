# Auth0 Integration Guide

This guide demonstrates how to integrate Auth0 authentication into a React application.

## Prerequisites

- React Project (using Vite)
- An Auth0 account (free tier)

## Quick Start

1. Install the Auth0 React SDK:

```bash
npm install @auth0/auth0-react
```

## Auth0 Setup

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application:
   - Select "Single Page Web Applications"
   - Go to "Settings"
   - Note your Domain and Client ID
   - Add `http://localhost:5173` to:
     - Allowed Callback URLs
     - Allowed Logout URLs
     - Allowed Web Origins

## Implementation Guide

### 1. Set Up Auth0 Provider

In your main application file:

```typescript
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="your-domain.auth0.com"
    clientId="your-client-id"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
```

### 2. Using Auth0 Hooks

The most important hooks and their usage:

```typescript
import { useAuth0 } from "@auth0/auth0-react";

// In your component:
const {
  // Whether the user is authenticated
  isAuthenticated,

  // Loading state
  isLoading,

  // User information
  user,

  // Login
  loginWithRedirect,

  // Logout
  logout,

  // Get access token
  getAccessTokenSilently,
} = useAuth0();
```

### 3. Protected Routes Example

```typescript
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <YourProtectedComponent />;
};
```

### 4. Login/Logout Buttons

```typescript
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({
          logoutParams: { returnTo: window.location.origin },
        })
      }
    >
      Log Out
    </button>
  );
};
```

### 5. User Profile Information

```typescript
const Profile = () => {
  const { user } = useAuth0();

  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <p>Email verified: {user?.email_verified ? "Yes" : "No"}</p>
    </div>
  );
};
```
