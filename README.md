# Learning Management System (LMS)

A comprehensive, role-based Learning Management System built with modern web technologies. This application enables administrators, instructors, and students to manage courses, assignments, submissions, and learning progress in an integrated platform.

## 🎯 Features

- **Multi-Role Support**: Admin, Instructor, and Student roles with granular permissions
- **Course Management**: Create, manage, and organize courses with modules and lessons
- **Assignments**: Create and manage assignments with submission tracking
- **Submission Review**: Comprehensive submission review and grading system
- **Notifications**: Real-time notifications for course updates and assignments
- **File Management**: Support for file uploads and document handling
- **User Management**: Complete user administration and role assignment
- **Approval Workflows**: Manage course and user approvals through dedicated workflows
- **Dashboard**: Personalized dashboards for different user roles
- **MDX Support**: Rich content creation with MDX editor integration
- **Authentication**: Secure signin/signup with session management

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 14+ with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Database**: [Prisma](https://www.prisma.io) ORM
- **Styling**: CSS with PostCSS
- **Authentication**: Custom auth implementation
- **API**: RESTful API routes
- **Content**: MDX editor support
- **UI Components**: Custom React components with role-based rendering

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL or your preferred Prisma-compatible database
- Environment variables configured (see [Environment Setup](#environment-setup))

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd lms
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lms_db"

# Add any additional environment variables needed for your setup
```

### 3. Setup Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```

To seed the database (if seed file exists):

```bash
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npx prisma studio` - Open Prisma Studio to view/manage database

## 📁 Project Structure

```
lms/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes (assignments, courses, notifications, etc.)
│   ├── app/                  # Main application pages and layout
│   ├── auth/                 # Authentication pages (signin, signup)
│   └── globals.css           # Global styles
├── components/               # Reusable React components
│   ├── approvals/            # Approval workflow components
│   ├── assignments/          # Assignment-related components
│   ├── course/               # Course management components
│   ├── course-assignment/    # Course assignment components
│   ├── course-create-form/   # Course creation form
│   ├── dashboard/            # Dashboard components
│   ├── mdxEditor/            # MDX content editor
│   ├── notifications/        # Notification components
│   ├── review-submission/    # Submission review components
│   ├── ui/                   # Base UI components
│   └── users/                # User management components
├── hooks/                    # Custom React hooks
│   ├── assignment/           # Assignment-related hooks
│   ├── courses/              # Course management hooks
│   ├── user/                 # User-related hooks
│   └── ...
├── lib/                      # Utility functions
│   ├── getUser.ts            # User fetching utilities
│   ├── isAuth.ts             # Authentication checks
│   └── utils.ts              # General utilities
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma         # Data model definition
│   └── migrations/           # Migration history
├── public/                   # Static assets
│   └── images/               # Image files
├── services/                 # Business logic and API services
│   ├── apis/                 # External API integrations
│   ├── external/             # External service connections
│   └── repository/           # Data repository layer
├── types/                    # TypeScript type definitions
├── utils/                    # Helper utility functions
│   ├── checkCourseCrudAccess.ts  # Course access control
│   ├── checkUserRole.ts          # Role verification
│   ├── constant.ts               # Application constants
│   └── ...
└── config files              # Configuration files (tsconfig.json, next.config.ts, etc.)
```

## 🔐 Authentication & Authorization

The application uses a custom authentication system with role-based access control:

- **Admin**: Full system access and user management
- **Instructor**: Can create courses, manage assignments, and review submissions
- **Student**: Can enroll in courses, submit assignments, and view notifications

Access control utilities are provided in `utils/checkUserRole.ts` and `utils/checkCourseCrudAccess.ts`.

## 🗄️ Database Schema

The project uses Prisma for database management. View and manage your database schema:

```bash
npx prisma studio
```

Key entities:
- Users (with roles)
- Courses
- Modules
- Lessons
- Assignments
- Submissions
- Notifications
- Files

## 🤝 API Endpoints

API routes are organized by feature:

- `/api/assignments/` - Assignment management
- `/api/courses/` - Course operations
- `/api/user/` - User management
- `/api/submission/` - Submission handling
- `/api/notification/` - Notifications
- `/api/webhooks/` - Webhook integrations

## 📝 Development Notes

- Use TypeScript for type safety
- Follow ESLint configuration for code quality
- Components use custom styling with CSS modules
- API responses follow a consistent format (see `utils/api-response.ts`)
- MDX editor is available for rich content creation

## 🐛 Troubleshooting

**Database Connection Issues**: Ensure `DATABASE_URL` in `.env.local` is correct and the database server is running.

**Build Errors**: Clear `.next` folder and reinstall dependencies:
```bash
rm -r .next node_modules
npm install
npm run build
```

**Port Already in Use**: Change the port:
```bash
npm run dev -- -p 3001
```

