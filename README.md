# AWS Amplify Next.js Clean Architecture

This repository contains a [Next.js application](https://nextjs.org/docs) integrated with [AWS Amplify](https://docs.amplify.aws/), providing a robust backend with server-side rendering (SSR). It is designed as a sandbox environment for rapid prototyping and testing. The project follows the guidelines provided in the [Amplify Next.js App Router with Server Components Guide](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs-app-router-server-components/) and implements the latest Next.js v15 ([React 19](https://react.dev/blog/2024/12/05/react-19)) features.

![Image](https://github.com/user-attachments/assets/f5bc67cf-0b31-4587-a1b4-827cac6b23ff)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [AWS Amplify Setup](#aws-amplify-setup)
- [Local Development](#local-development)
- [Amplify Authenticator Component](#amplify-authenticator-component)
- [Clean Architecture](#clean-architecture)
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
   git clone https://github.com/matt-wigg/aws-amplify-next-js-clean-architecture.git
   cd aws-amplify-next-js-clean-architecture
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## AWS Amplify Setup

> [!IMPORTANT]  
> Before running the application, you need to set up AWS Amplify for local development. Follow the official AWS documentation for configuring your AWS account and setting up IAM Identity Center - [Configure AWS for Local Development](https://docs.amplify.aws/nextjs/start/account-setup/).

### Amplify Sandbox Management

You can manage Amplify sandboxes in two ways:

#### 1. Custom NPM Scripts (reccomended for local dev)

Located in `infrastructure/amplify/scripts/`, these scripts simplify common sandbox operations with interactive prompts.

##### Start a Sandbox (with prompts)

```bash
cd infrastructure
npm run amplify
```

This will:

1. Prompt for your AWS profile (e.g. aws-dev-environment)
2. Prompt for a sandbox identifier (optional)

##### Delete a Sandbox (with confirmation)

```bash
cd infrastructure
npm run amplify:delete
```

This will:

1. Prompt for the same profile and optional identifier
2. Ask for confirmation before deleting resources

#### 2. Standard Amplify CLI Commands (Manual)

Use these when you need full control or automation in CI/CD pipelines.

##### Start a Sandbox (manually)

```bash
cd infrastructure
npx ampx sandbox --profile <your-profile-name> --identifier <optional-custom-id>
```

##### Delete a Sandbox (manually)

```bash
cd infrastructure
npx ampx sandbox delete --profile <your-profile-name> --identifier <optional-custom-id>
```

### About Identifiers

By default, the sandbox `--identifier` is set to your system username. If you start a sandbox with a custom identifier, ***you must also delete it using the same identifier***.

## Local Development

> [!NOTE]  
> Please see the official Amplify documentation for more information on how to [use cloud sandboxes in dev environments](https://docs.amplify.aws/nextjs/deploy-and-host/sandbox-environments/setup/).

1. Start the Next.js Development Server

   ```bash
   npm run dev
   ```

   or start with [turbopack](https://nextjs.org/docs/app/api-reference/turbopack) - *a faster development server*:

   ```bash
   npm run turbo-dev
   ```

2. Start the Amplify Sandbox

   ```bash
   cd infrastructure
   npm run amplify
   ```

3. Access the Application

   Your application will be available at [http://localhost:3000](http://localhost:3000).

## Amplify Authenticator Component

This project utilizes the [AWS Amplify Authenticator UI component](https://ui.docs.amplify.aws/react/connected-components/authenticator) to manage user authentication seamlessly. The Authenticator provides pre-built, customizable authentication flows, including sign-up, sign-in, and multi-factor authentication, reducing the need for extensive boilerplate code.

### Customizing the Authenticator

![Image](https://github.com/user-attachments/assets/b3a093c2-c502-447c-b14c-08a6fdb1ee7c)

You can [customize the Authenticator component](https://ui.docs.amplify.aws/react/connected-components/authenticator/customization) by providing custom components for the header, footer, and other UI elements.

```jsx
// @/components/auth/cognito-authenticator

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Logo from "@public/logo.webp";
import { ROUTES } from "@nextjs/constants/routes.constants";

/**
 * Custom UI components for the Amplify Authenticator.
 * Includes Matt Wigg-branded header and a global footer.
 */
const customComponents = {
  Header() {
    return (
      <figure className="w-30 h-30 mx-auto border relative overflow-hidden rounded-full mb-8">
        <Image
          src={Logo}
          alt="Matt Wigg Logo"
          fill
          sizes="96px"
          style={{
            objectFit: "cover",
          }}
          priority
          quality={85}
        />
      </figure>
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
 * Handles redirecting the user to the app after successful authentication.
 */
function AuthRedirectHandler() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace(ROUTES.INTERNAL.HOME);
    }
  }, [authStatus, router]);

  return null;
}

/**
 * CognitoAuthenticator component.
 * Renders the Amplify Authenticator with Matt Wigg branding and handles routing after login.
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

## Clean Architecture

This project follows [Uncle Bob’s Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) principles to enforce a clear separation of concerns and maintain high scalability and testability.

![Image](https://github.com/user-attachments/assets/99bcd695-67cb-4466-825e-2084ed9df829)

### Key Concepts

Clean Architecture promotes the following layered structure:

- **Domain Layer (Entities & Interfaces):**

  - Contains pure business logic and core models (e.g. `Todo`, `User`, etc.).
  - Defines interfaces for repositories, not implementations.
  - Independent of frameworks, databases, or UI.

- **Infrastructure Layer (Frameworks, Drivers):**

  - Implementation details (e.g. AWS Amplify, cookies, API clients).
  - Injected into the system via interfaces, never accessed directly by use cases.

- **Application Layer (Use Cases):**

  - Contains business use cases that orchestrate operations (e.g. `createTodo`, `getCurrentUser`).
  - Coordinates domain entities and repository interfaces.
  - No knowledge of external dependencies.

- **Interface Adapters (Controllers, Presenters):**

  - Adapts data between the application layer and the outside world.
  - Includes controllers (input), presenters (output), and formatters.
  - Converts raw results into view-ready responses.

### Example: Todo List Flow

The following example demonstrates how the `getTodos` functionality flows through all architectural layers:

#### 1. Domain Layer (Entities & Interfaces)

```typescript
// @domain/models/Todo.ts

type Todo = {
  id: string;
  content: string;
  order?: number;
  // ...other properties
}
```

```typescript
// @domain/interfaces/todo.repository.interface.ts

interface ITodoRepository {
  list(): Promise<Todo[]>;
  // ...other methods
}
```

#### 2. Infrastructure Layer (Frameworks & Drivers)

```typescript
// @infrastructure/repositories/todo.repository.ts

import { cookiesClient } from "@infrastructure/utils/amplify.utils";
import type { ITodoRepository } from "@domain/repositories/todo.interface";

export const todoRepository: ITodoRepository = {
  async list(): Promise<Todo[]> {
    try {
      const { data } = await cookiesClient.models.Todo.list({});
      return data ?? [];
    } catch (err) {
      console.error("TodoRepository.list error", err);
      return [];
    }
  },
  // ...other methods
};
```

#### 3. Application Layer (Use Cases)

```typescript
// @application/use-cases/todo/get-todos.ts

import type { ITodoRepository } from "@domain/repositories/todo.interface";
import type { Todo } from "@domain/models/Todo";

export async function getTodos(repo: ITodoRepository): Promise<Todo[]> {
  return repo.list();
}
```

#### 4. Interface Adapters (Controllers & Presenters)

```typescript
// @interfaceadapters/controllers/todo/todo.controller.ts

import { getTodos } from "@application/use-cases/todo/get-todos";
import { todoRepository } from "@infrastructure/repositories/todo.repository";

export const TodoController = {
  async getTodos(): Promise<Todo[]> {
    return getTodos(todoRepository);
  },
  // ...other methods
};
```

```typescript
// @interfaceadapters/presenters/todo/todo.presenter.ts

export const TodoPresenter = {
  presentSortedTodos(todos: Todo[]): Todo[] {
    if (todos.length === 0) {
      return [];
    }
    return [...todos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
};
```

#### 5. UI Layer (Pages & Components)

```tsx
// @nextjs/app/(authenticated)/draggable/page.tsx

"use server";

import { TodoController } from "@interface-adapters/controllers/todo/todo.controller";
import { TodoPresenter } from "@interface-adapters/presenters/todo/todo.presenter";
import { DraggableTodoList } from "@nextjs/components/draggable/draggable-todo-list";

export default async function DraggablePage() {
  // Controller retrieves data from use case
  const todos = await TodoController.getTodos();
  // Presenter formats data for UI consumption
  const sortedTodos = TodoPresenter.presentSortedTodos(todos);

  return (
    <main>
      {/* Components receive and display the prepared data */}
      <DraggableTodoList initialTodos={sortedTodos} />
    </main>
  );
}
```

### Benefits

- **Testable:** Core business logic is isolated and can be unit tested independently of infrastructure or UI.
- **Framework-Agnostic:** You can replace AWS Amplify, Next.js, or UI libraries with minimal refactoring, thanks to clear abstractions.
- **Maintainable:** Well-defined boundaries ensure that changes in one layer do not create unintended side effects in others.
- **Extensible:** The modular structure makes it straightforward to add new features, integrations, or swap implementations as requirements evolve.

### Resources

- 🧠 [The Clean Architecture - Uncle Bob (Blog)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- 📘 [Clean Architecture Book - Robert Martin (Uncle Bob)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- 🎥 [Clean Architecture Explained - Jason Taylor](https://www.youtube.com/watch?v=dK4Yb6-LxAk)

## Deployment

### Amplify Hosting

Amplify supports deployment and hosting for server-side rendered (SSR) web apps created using Next.js. Please see the Amplify documentation: [Amplify support for Next.js](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html).

### Fullstack Branch Deployment

Amplify code-first DX (Gen 2) offers fullstack branch deployments that allow you to automatically deploy infrastructure and application code changes from feature branches. [Fullstack Branch Deployments](https://docs.amplify.aws/nextjs/deploy-and-host/fullstack-branching/branch-deployments/).

## Troubleshooting

| Issue | Solution |
|--------|---------|
| `Amplify CLI Issues` | Update with: `npm install -g @aws-amplify/cli` |
| `Build Failures` | Ensure Node.js and npm versions match the project requirements. |
| `Amplify Sandbox Issues` | Check Amplify Sandbox setup and AWS credentials. |

[Back to Top](#aws-amplify-nextjs-clean-architecture)
