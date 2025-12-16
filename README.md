# FixWi - IT Support Ticket Management System

FixWi is a modern, full-featured IT support ticket management system built with Next.js 16, React 19, and TypeScript. It provides a comprehensive solution for managing technical support tickets with role-based access control, real-time updates, and an intuitive user interface.

## 🚀 Features

### Core Functionality
- **Ticket Management**: Create, view, update, and track support tickets
- **User Management**: Complete user administration with role-based access
- **Authentication System**: Secure JWT-based authentication
- **Role-Based Access Control**: Separate dashboards for admins and coders
- **Category Organization**: Tickets organized by categories with custom icons
- **Status Tracking**: Track ticket status (Open, In Progress, Closed)

### Technical Features
- **Modern UI**: Built with HeroUI and Tailwind CSS 4
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript implementation
- **API Integration**: Axios-based API client with interceptors
- **Form Management**: Interactive forms with validation
- **Toast Notifications**: User feedback with react-toastify
- **Smooth Animations**: Framer Motion animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 20 or higher
- **npm**: Version 8 or higher
- **Backend API**: FixWi backend service running (configure in environment variables)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FixWi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FixWi/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   └── login/          # Login page
│   │   ├── (dashboard)/        # Dashboard routes
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── coder/          # Coder dashboard
│   │   │   ├── tickets/        # Ticket management
│   │   │   │   ├── [id]/       # Ticket detail
│   │   │   │   └── create/     # Create ticket
│   │   │   └── users/          # User management
│   │   ├── styles/             # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── providers.tsx       # Context providers
│   ├── components/             # React components
│   │   ├── atoms/              # Basic components (Button, Input)
│   │   ├── molecules/          # Composite components (Forms, Filters)
│   │   ├── organisms/          # Complex components (Sidebar, Topbar)
│   │   └── templates/          # Page templates
│   ├── constants/              # Application constants
│   ├── context/                # React context (AuthContext)
│   ├── lib/
│   │   └── api/                # API configuration
│   ├── service/                # API service layer
│   │   ├── auth-service.ts     # Authentication API
│   │   ├── ticket-service.ts   # Ticket management API
│   │   └── user-service.ts     # User management API
│   └── types/                  # TypeScript type definitions
│       ├── index.ts
│       ├── ticket.ts
│       └── user.ts
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Architecture

### Component Architecture
FixWi follows the **Atomic Design Pattern**:

- **Atoms**: Basic building blocks (Button, Input)
- **Molecules**: Simple combinations (LoginForm, TicketForm, FilterSelect)
- **Organisms**: Complex components (Sidebar, Topbar, TicketCard)
- **Templates**: Page-level layouts (DashboardAdmin, DashboardCoder)

### State Management
- **AuthContext**: Global authentication state
- **React Context API**: For state sharing across components

### Routing
- **App Router**: Next.js 16 App Router with file-based routing
- **Route Groups**: Organized by feature (`(auth)`, `(dashboard)`)
- **Dynamic Routes**: Parameterized routes for ticket details

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full system access, user management, all tickets
- **Coder/User**: Limited access, own tickets, ticket creation

### Authentication Flow
1. User logs in via `/login`
2. JWT token received and stored
3. Axios interceptor adds token to requests
4. Protected routes check authentication status
5. Role-based routing to appropriate dashboard

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 16.0.10
- **UI Library**: React 19.2.1
- **UI Components**: HeroUI 2.8.5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.26
- **Icons**: Lucide React 0.561.0
- **Type Safety**: TypeScript 5

### Development Tools
- **Linter**: ESLint 9
- **Code Quality**: React Compiler
- **HTTP Client**: Axios 1.13.2
- **JWT Handling**: jwt-decode 4.0.0
- **Notifications**: react-toastify 11.0.5

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API base URL

### API Endpoints
The application expects the following API endpoints:

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

**Tickets**
- `GET /tickets` - List all tickets
- `GET /tickets/:id` - Get ticket details
- `POST /tickets` - Create new ticket
- `PUT /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket

**Users**
- `GET /users` - List all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

**Categories**
- `GET /categories` - List all categories

## 🎨 UI/UX Features

- Clean, modern interface components
- Responsive design for desktop, tablet, and mobile
- Loading states and error handling
- Toast notifications for user feedback
- Accessible components following WCAG guidelines

## 🚦 Getting Started Guide

### For Admins
1. Log in with admin credentials
2. Access the admin dashboard
3. Manage users from the Users section
4. View and manage all tickets
5. Monitor system-wide ticket statistics

### For Coders/Users
1. Log in with user credentials
2. Access the coder dashboard
3. View assigned tickets
4. Create new support tickets
5. Update ticket status

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

FixWi Development Team (Pablo, Camila, Cristian, Brisbany, Menelik)

## 🐛 Known Issues & Roadmap

### Current Limitations
- Requires backend API to be running
- No offline support

### Planned Features
- [ ] Real-time notifications
- [ ] File attachments for tickets
- [ ] Advanced search and filtering
- [ ] Ticket assignment system
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Export reports

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Next.js and React**
