# Gold Billing Frontend

React-based frontend application for the Gold Billing System.

## Features

- Modern React 18 with Vite
- Redux Toolkit for state management
- React Router for navigation
- Responsive design
- Authentication system
- Component-based architecture

## Project Structure

```
src/
├── api/                 # API configuration
├── assets/             # Static assets (icons, images)
│   ├── icons/
│   └── imges/
├── components/         # Reusable components
│   ├── common/         # Common components
│   └── ui/            # UI components
├── features/          # Feature-based modules
│   └── auth/          # Authentication feature
│       ├── components/
│       └── pages/
├── layout/            # Layout components
│   └── components/
│       ├── AppLayout.jsx
│       ├── Header.jsx
│       └── SideBar.jsx
├── redux/             # Redux store and slices
│   ├── actions/
│   └── slices/
├── devices/           # Device management
├── map/              # Map functionality
├── App.jsx           # Main App component
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 18
- Vite
- Redux Toolkit
- React Router
- Axios
- CSS3
