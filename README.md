# Mindly Frontend

Mindly is a premium "Second Brain" interface designed for maximum productivity and visual excellence. Access your organized content, share your brain, and manage your digital life with a sleek, modern UI.

## ✨ Features

- **Premium Design**: Modern aesthetics with glassmorphism, smooth gradients, and interactive elements.
- **Dynamic Dashboard**: View and filter your content by categories (Tweets, Videos, Documents).
- **Interactive Share Brain**: Instantly share your brain with a toggle and copy-to-clipboard functionality.
- **Responsive Layout**: Seamless experience across mobile, tablet, and desktop devices.
- **Real-time Updates**: Integrated with a robust backend for persistent storage and secure access.

## 🛠️ Tech Stack

- **React 19**: Powered by the latest React features.
- **Vite**: Ultra-fast development environment and build tool.
- **Tailwind CSS 4**: Modern utility-first styling with advanced design tokens.
- **Zustand**: Lightweight and efficient global state management.
- **Lucide React**: Beautiful, consistent iconography.
- **React Router 7**: Sophisticated client-side routing.

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- Backend API running (see [Mindly_BE](../Mindly_BE/README.md))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the backend URL:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Checks the codebase for linting errors.
- `npm run preview`: Previews the production build locally.
