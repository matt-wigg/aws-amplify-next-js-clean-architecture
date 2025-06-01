# AWS Amplify Next.js Starter App

This repository contains a [Next.js application](https://nextjs.org/docs) integrated with [AWS Amplify](https://docs.amplify.aws/), providing a robust backend with server-side rendering (SSR). It is designed as a sandbox environment for rapid prototyping and testing. The project follows the guidelines provided in the [Amplify Next.js App Router with Server Components Guide](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs-app-router-server-components/) and implements the latest Next.js v15 ([React 19](https://react.dev/blog/2024/12/05/react-19)) features.

![Image](https://github.com/user-attachments/assets/dbaae519-e4e9-42c9-b802-4118b07c0b1d)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [AWS Amplify Setup](#aws-amplify-setup)
- [Local Development](#local-development)
- [Amplify Authenticator Component](#amplify-authenticator-component)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

- **Server-Side Rendering (SSR):** Utilizes Next.js for fast, SEO-friendly pages.
- **AWS Amplify Integration:** Simplifies backend management for authentication, APIs, and storage.
- **Sandbox Environment:** Ideal for testing and development, with the ability to switch between multiple environments.
- **Extensible Architecture:** Easily extend the app with additional backend services or frontend components.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: [Download](https://nodejs.org/en/download/) (runtime for JavaScript).
- **npm**: [Download](https://www.npmjs.com/get-npm) (comes with Node.js).
- **Git**: [Download](https://git-scm.com/downloads) (to clone the repository).
- **AWS Account**: [Sign Up](https://aws.amazon.com/) (for Amplify services).

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/matt-wigg/aws-amplify-next-js-starter-app.git
   cd aws-amplify-next-js-starter-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## AWS Amplify Setup

Before running the application, you need to set up AWS Amplify for local development. Follow the official AWS documentation for configuring your AWS account and setting up IAM Identity Center - [Configure AWS for Local Development](https://docs.amplify.aws/nextjs/start/account-setup/).

## Local Development

> [!NOTE]  
> Please see the offical Amplify documentation for more information on how to [use cloud sandboxes in dev environments](https://docs.amplify.aws/nextjs/deploy-and-host/sandbox-environments/setup/).

1. Start the Next.js Development Server

   ```bash
   npm run dev
   ```

   or start with [turbopack](https://nextjs.org/docs/app/api-reference/turbopack) - _a faster development server_:

   ```bash
   npm run turbo-dev
   ```

2. Start the Amplify Sandbox

   ```bash
   npx ampx sandbox --profile <your-profile-name>
   ```

3. Access the Application

   Your application will be available at [http://localhost:3000](http://localhost:3000).

## Amplify Authenticator Component

This project utilizes the [AWS Amplify Authenticator UI component](https://ui.docs.amplify.aws/react/connected-components/authenticator) to manage user authentication seamlessly. The Authenticator provides pre-built, customizable authentication flows, including sign-up, sign-in, and multi-factor authentication, reducing the need for extensive boilerplate code.

### Customizing the Authenticator

![Image](https://github.com/user-attachments/assets/6157d2a8-fe20-47ca-99fd-1b80dbe5b3e9)

You can [customize the Authenticator component](https://ui.docs.amplify.aws/react/connected-components/authenticator/customization) by providing custom components for the header, footer, and other UI elements.

```jsx
// @/components/auth/cognito-authenticator

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "@/../public/logo.webp";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { ROUTES } from "@/constants/routes.constants";

/**
 * Custom UI components for Amplify Authenticator.
 */
const customComponents = {
  Header() {
    const { resolvedTheme } = useTheme();
    console.log("Current theme:", resolvedTheme);
    return (
      <Image
        src={Logo}
        alt="Matt Wigg Logo"
        width={250}
        priority
        className="h-auto mx-auto mb-8"
      />
    );
  },
  Footer() {
    return (
      <p className="text-sm text-center text-muted-foreground mt-4">
        &copy; {new Date().getFullYear()} Matt Wigg. All Rights Reserved.
      </p>
    );
  },
};

/**
 * Handles redirecting the user after successful authentication.
 */
function AuthRedirectHandler() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace(ROUTES.INTERNAL.WELCOME);
    }
  }, [authStatus, router]);

  return null;
}

/**
 * Amplify Cognito Authenticator component.
 * Wraps the sign-in UI with Matt Wigg branding and handles post-login redirection.
 */
export function CognitoAuthenticator() {
  return (
    <Authenticator.Provider>
      <AuthRedirectHandler />
      <Authenticator components={customComponents} initialState="signIn" />
    </Authenticator.Provider>
  );
}

```

## Deployment

### Amplify Hosting

Amplify supports deployment and hosting for server-side renderd (SSR) web apps created using Next.js. Please see the Amplify documentation for more information: [Amplify support for Next.js](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html).

### Fullstack Branch Deployment

Amplify code-first DX (Gen 2) offers fullstack branch deployments that allow you to automatically deploy infrastructure and application code changes from feature branches. This enables testing changes in an isolated environment before merging to the main branch. Please see the Amplify documentation for more information: [Fullstack Branch Deployments](https://docs.amplify.aws/nextjs/deploy-and-host/fullstack-branching/branch-deployments/).

## Troubleshooting

### Common Issues

| Issue | Solution |
|--------|---------|
| `Amplify CLI Issues` | Update with: ```npm install -g @aws-amplify/cli``` |
| `Build Failures` | Ensure Node.js and npm versions match the project requirements. |
| `Amplify Sandbox Issues` | Check the Amplify Sandbox documentation to ensure your AWS account is correctly configured. |
