
# 🌪️ Floq


> **Floq** is a backend development framework that gives you the **ease of serverless** with the **power and control of a VPS**.

With Floq, anyone with a VPS can build and deploy backend applications in a **serverless-like environment**, but without the usual limitations — no cold starts, no runtime restrictions, and full server access.

---

## ✨ Features

* **Simple Project Initialization**: Bootstrap a new backend project with a single command.
* **Runtime Flexibility**: Choose between **Deno**, **Node.js**, and (soon) **Bun**.
* **Local Development**: Run and test your backend app locally with ease.
* **Seamless Deployment**: Deploy directly to your VPS with a single command (coming soon!).
* **Full Control**: Unlike managed serverless, you get unrestricted access to your infrastructure.

---

## 🚀 Getting Started

### 1. Create a new Floq project

```bash
npm create floq@latest
```

You’ll be prompted for:

* **Project Name** (default: `floq-app`)
* **Runtime** (choose between **Deno**, **Node**, or **Bun** in the future — default: `Deno`)

### 2. Move into your project directory

```bash
cd <your-project-name>
```

* For **Deno** projects: `deno install` is run automatically.
* For **Node.js** projects: `npm install` is run automatically.

### 3. Start coding 🎉

* For Deno projects, your app entrypoint is in: `src/main.ts`
* For Node projects, your app entrypoint is in: `src/index.js`
* Project metadata is stored in: `floq.json`

#### Example: Hello World (Deno)

When you create a new Floq project, you’ll start with a simple route definition like this:

```ts
import { HttpMethod, type Route } from "@floq/floq";

const simpleTask: Route = {
  path: "/app",
  method: HttpMethod.GET,
  name: "app",
  task: () => {
    console.log("Hello world from app");
  },
  children: [
    {
      name: "home",
      path: "home",
      method: HttpMethod.GET,
      task: () => {
        console.log("Hello world from home path");
      },
    },
    {
      name: "floq",
      path: "floq",
      method: HttpMethod.GET,
      task: () => {
        console.log("Hello world from floq");
      },
    },
  ],
};

export default simpleTask;
```

This starter demonstrates how Floq:

* Defines routes with a `path`, `method`, and `task`
* Supports **nested child routes** (e.g., `/app/home`, `/app/floq`)
* Lets you start with simple functions and grow into complex backend logicjs

````

---

## 🛠 Running Locally

To run your backend app in development mode:

```bash
floq dev
````


This gives you a **local development server** to test before deploying.

---

## 📦 Deployment

Deploy to your VPS with:

```bash
floq deploy
```

⚠️ Deployment is currently **in development** — coming soon!

---

## 📂 Project Structure

After initialization, a typical Floq project looks like this:

```
<project-name>/
├── floq/
│   └── index.(ts|js)     # Main entrypoint
├── src/                  # Your source code
├── floq.json             # Floq config (project name + runtime)
├── deno.json             # Deno config (Deno projects only)
├── package.json          # Node.js config (Node projects only)
└── .gitignore
```

---

## 🤝 Contributing

We welcome contributions!

* **Repo**: [github.com/skyguardAfrica/create-floq](https://github.com/skyguardAfrica/create-floq)
* **Issues**: [github.com/skyguardAfrica/create-floq/issues](https://github.com/skyguardAfrica/create-floq/issues)

Feel free to open issues, request features, or submit PRs.

---

## 📜 License

MIT License © 2025 [Skyguard Africa](https://github.com/skyguardAfrica)

---

### ⭐ Roadmap

Here are the planned next steps for Floq development:

* [x] Project initialization
* [x] Local development server
* [ ] **Bun runtime support**: Allow initializing and running projects with Bun in addition to Deno and Node.
* [ ] **Deploy to your VPS**: Built‑in deployment tooling so you can push your Floq app directly to your own VPS.
* [ ] **Deploy to our VPS (managed hosting)**: One‑command deployment to Floq’s managed VPS service for an even simpler experience.
* [ ] **Batteries included**: Optional integrations for common backend needs such as Authentication & Database support, and a Mailer service.
* [ ] **Templates**: Starter templates for common API styles like REST and GraphQL.
* [ ] **Monitoring & logs**: Built‑in observability features to help debug and monitor your applications.

---
