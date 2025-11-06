# RealEstate Pro - Property Management System

A modern, cloud-based real estate property management software built with Next.js, TypeScript, and Firebase.

## Features

- 🏠 **Property Management**: Create, read, update, and delete properties
- ☁️ **Cloud Storage**: All data stored securely in Firebase Firestore
- 🔐 **Authentication**: User authentication with role-based access (Admin, Agent, Client)
- 📸 **Image Upload**: Upload and manage property images with Firebase Storage
- 🔍 **Search & Filter**: Advanced search and filtering capabilities
- 📊 **Dashboard**: Real-time statistics and property overview
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Real-time Updates**: Instant data synchronization across all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore (Cloud NoSQL)
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account (free tier works fine)

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable the following services:
   - **Authentication**: Enable Email/Password sign-in method
   - **Firestore Database**: Create a database in production mode
   - **Storage**: Enable Firebase Storage
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web icon (</>)
   - Copy the configuration values

### Installation

1. Clone or navigate to the project directory:
```bash
cd real-estate-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Open `.env.local` file
   - Replace the placeholder values with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating an Account

1. Click "Sign Up" in the navigation bar
2. Fill in your details
3. Choose account type:
   - **Agent**: Can create, edit, and manage their own properties
   - **Client**: Can view and browse properties
4. Click "Sign Up"

### Adding Properties (Agent/Admin only)

1. Log in with an Agent or Admin account
2. Go to Dashboard
3. Click "Add New Property"
4. Fill in property details
5. Upload property images
6. Click "Create Property"

### Browsing Properties

1. Click "Properties" in the navigation bar
2. Use filters to search by:
   - Status (Available, Sold, Pending, Rented)
   - Property Type (House, Apartment, Condo, Land, Commercial)
   - Search by title, city, or address
3. Click on a property card to view full details

### Managing Properties

1. Go to Dashboard
2. View your properties and statistics
3. Click "Edit" to modify a property
4. Click "Delete" to remove a property

## Project Structure

```
real-estate-app/
├── app/                          # Next.js app directory
│   ├── dashboard/               # Dashboard pages
│   │   ├── add-property/       # Add property page
│   │   ├── edit-property/[id]/ # Edit property page
│   │   └── page.tsx            # Main dashboard
│   ├── login/                   # Login page
│   ├── properties/              # Properties pages
│   │   ├── [id]/               # Property detail page
│   │   └── page.tsx            # Properties listing
│   ├── signup/                  # Signup page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── auth/                   # Authentication components
│   ├── navbar.tsx              # Navigation bar
│   ├── property-card.tsx       # Property card component
│   └── property-form.tsx       # Property form component
├── lib/                        # Utility functions
│   ├── auth-context.tsx        # Authentication context
│   ├── firebase.ts             # Firebase configuration
│   └── properties.ts           # Property CRUD operations
├── types/                      # TypeScript type definitions
│   └── index.ts
└── .env.local                  # Environment variables
```

## Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /properties/{propertyId} {
      allow read: if true;
      allow create: if request.auth != null && 
        (request.resource.data.agentId == request.auth.uid);
      allow update, delete: if request.auth != null && 
        (resource.data.agentId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Firebase Hosting**
- Any Node.js hosting platform

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

## Features Roadmap

- [ ] Email notifications
- [ ] Property comparison
- [ ] Saved favorites
- [ ] Advanced analytics
- [ ] Property tours scheduling
- [ ] Document management
- [ ] Multi-language support

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Next.js and Firebase
