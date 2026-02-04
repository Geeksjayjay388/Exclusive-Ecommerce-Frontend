# Exclusive Frontend

The frontend of the Exclusive E-commerce application, built with React and Vite.

## 🛠 Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (Global Auth & Cart)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## 🚀 Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📱 Key Pages

- **Home**: Product categories, Flash Sales, and Featured products.
- **Admin Dashboard**: Accessible at `/admin/dashboard` for creates new products (Admin only).
- **Cart**: Summary of selected items with quantity controls.
- **Profile**: User account details and logout.
- **Auth**: Modern Sign Up and Login pages.

## 🔐 Authentication Flow

The app uses an `AuthContext` to manage the global user state. The JWT token is stored in `localStorage` and automatically attached to every API request via a custom Axios interceptor located in `src/utils/api.js`.

## 🛒 Cart Logic

Cart state is managed globally via `CartContext` and persists to `localStorage` so items remain even after page reloads.
