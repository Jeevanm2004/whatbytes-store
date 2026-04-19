# WhatBytes Store

A premium, highly responsive e-commerce storefront built with a modern tech stack. WhatBytes Store features a dynamic product grid, robust filtering systems, and a seamless shopping experience.

[**Live Demo**](https://whatbytes-store-kz9ax7ma8-jeevanm17112004-4565s-projects.vercel.app)

## 🚀 Features

- **Dynamic Product Listing**: A responsive grid layout featuring premium product cards with hover effects and detailed information.
- **Featured Product**: An automatically highlighted featured card at the top of the grid for high-visibility items.
- **Robust Filtering System**: 
  - Filter by **Category** (Electronics, Clothing, Home, etc.).
  - Filter by **Price Range** using both a slider and numeric input.
  - Filter by **Brand** (Apple, Samsung, IKEA, etc.).
  - **Search Bar** as you type filtering.
- **URL-Based State Management**: All search, filter, and category states are synced with URL query parameters for easy sharing and persistence across navigation.
- **Detailed Product Pages**: Deep-dive into items with rich descriptions, star ratings, and community reviews.
- **Shopping Cart**:
  - Add/Remove items.
  - Granular quantity controls.
  - Instant total calculation.
- **Persistence**: Cart data is persisted using `localStorage`, ensuring your items are safe even after a page refresh.
- **Modern UI/UX**: Clean, blue-themed professional aesthetic with smooth transitions and mobile-first design.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

To run the project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Jeevanm2004/whatbytes-store.git
cd whatbytes-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/`: Next.js 14 App Router pages and layouts.
- `src/components/`: Reusable UI components (Product Cards, Filters, etc.).
- `src/context/`: State management via `CartContext`.
- `src/data/`: Static product inventory and mock data.
- `src/types/`: Centralized TypeScript interfaces.

---

Built by [Jeevan M](https://github.com/Jeevanm2004)
