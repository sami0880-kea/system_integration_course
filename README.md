# System Integration - KEA 2025

## Mandatory I

| Assignment | Link                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01a        | [Data parsing servers - Part I](https://github.com/sami0880-kea/system_integration_course/tree/main/00._Assignments/01._Data_Parser/01._Part_1)  |
| 03a        | [Data parsing server - Part III](https://github.com/sami0880-kea/system_integration_course/tree/main/00._Assignments/01._Data_Parser/03._Part_3) |
| 04a        | [SSE example](https://github.com/sami0880-kea/system_integration_course/tree/main/13._Server-sent_events)                                        |
| 04b        | [Database granular access](https://github.com/sami0880-kea/system_integration_course/tree/main/00._Assignments/04b._database_granular)           |
| 06a        | [Websocket Example](https://github.com/sami0880-kea/system_integration_course/tree/main/14._WebSockets)                                          |

## Mandatory II

| Assignment | Link                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 08a        | [WebRTC Example](https://github.com/sami0880-kea/system_integration_course/tree/main/16._WebRTC/02._webrtc_firestore)                             |
| 08b        | [Documentation for DLS](#)                                                                                                                        |
| 10a        | [Document A Database](https://github.com/sami0880-kea/system_integration_course/tree/main/17._Database_Migrations)                                |
| 10b        | [Migrate From One Database To Another](https://github.com/sami0880-kea/system_integration_course/tree/main/17._Database_Migrations/03._migration) |
| 11a        | [Auth Integration](#)                                                                                                                             |
| 11b        | [Integrate with payment](#)                                                                                                                       |
| 12a        | [Webhook System](#)                                                                                                                               |
| 13a        | [GraphQL](#)                                                                                                                                      |

### Author

- [@sami0880-kea](https://www.github.com/sami0880-kea)

# Auth0 Integration Demo

This project demonstrates integration with Auth0 for authentication and authorization in a React application. It uses Radix UI for accessible components and Tailwind CSS for styling.

## Features

- User authentication with Auth0
- Social login providers support
- Protected routes
- User profile display
- Responsive design
- Accessible UI components

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- An Auth0 account

## Setup Instructions

### 1. Auth0 Setup

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new application or select an existing one
3. Select "Single Page Application" as the application type
4. In the application settings:
   - Add `http://localhost:5173` to "Allowed Callback URLs"
   - Add `http://localhost:5173` to "Allowed Logout URLs"
   - Add `http://localhost:5173` to "Allowed Web Origins"
5. Note down your:
   - Domain
   - Client ID

### 2. Environment Setup

1. Create a `.env` file in the root directory:
   ```env
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-client-id
   ```

### 3. Project Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

- `/src/components/` - React components
  - `Navigation.tsx` - Main navigation bar with auth controls
  - `Profile.tsx` - User profile display
- `/src/config/` - Configuration files
  - `auth0.config.ts` - Auth0 configuration

## Tech Stack

- React
- TypeScript
- Auth0
- Radix UI
- Tailwind CSS
- React Router

## Additional Configuration

### Social Connections

To enable social logins:

1. Go to Auth0 Dashboard > Authentication > Social
2. Enable and configure the social providers you want (e.g., Google, GitHub)
3. Configure your social provider credentials

### Customizing the Login Experience

You can customize the Auth0 login page:

1. Go to Auth0 Dashboard > Branding
2. Customize colors, logo, and other branding elements
3. Configure Universal Login settings

## Security Considerations

- The application uses Auth0's secure authentication flow
- Tokens are handled securely by Auth0's SDK
- Environment variables are used for sensitive configuration
- Protected routes ensure authenticated access

## Troubleshooting

Common issues and solutions:

1. **Callback URL errors**: Ensure your Auth0 application settings include the correct callback URLs
2. **Token errors**: Check if your Auth0 configuration matches the environment variables
3. **CORS issues**: Verify the allowed origins in Auth0 settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
