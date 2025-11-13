# Instagram Clone

A React Native Instagram clone application featuring a feeds page with search functionality. This app demonstrates a modern mobile app architecture with infinite scrolling, video support, and real-time search capabilities.

## Screenshots
![Login Screen](./screenshots/login.png)
![Feeds Screen](./screenshots/feeds.gif)

## Features

### Core Features
- **Feeds Page**: Instagram-style masonry grid layout displaying posts with images and videos
- **Search Functionality**: Real-time search with debouncing to filter feeds by name
- **Infinite Scrolling**: Paginated feed loading with pull-to-refresh support
- **Video Support**: Auto-playing videos for tall posts in the feed
- **Image Slider**: Multi-image support with swipeable image galleries
- **Authentication**: Login system with session management
- **Responsive UI**: Animated search bar that hides/shows on scroll
- **Performance Optimized**: Uses FlashList for efficient rendering of large lists

### UI/UX Features
- Smooth animations and transitions using React Native Reanimated
- Skeleton loading states for better perceived performance
- Pull-to-refresh functionality
- Viewport-based video playback (videos pause when not visible)
- Animated header that responds to scroll position
- Dark/Light theme support

## Tech Stack

### Core
- **React Native** (0.82.1) - Mobile framework
- **React** (19.1.1) - UI library
- **TypeScript** - Type safety

### Navigation & State Management
- **@react-navigation/native** (7.1.19) - Navigation library
- **@react-navigation/bottom-tabs** (7.8.4) - Tab navigation
- **@react-navigation/native-stack** (7.6.2) - Stack navigation
- **@reduxjs/toolkit** (2.10.1) - State management
- **react-redux** (9.2.0) - React bindings for Redux

### Data Fetching & Caching
- **@tanstack/react-query** (5.90.7) - Server state management
- **axios** (1.13.2) - HTTP client
- **miragejs** (^0.1.48) - API mocking for development

### UI & Animation
- **react-native-reanimated** (4.1.3) - Animations
- **react-native-gesture-handler** (2.29.1) - Gesture handling
- **@shopify/flash-list** (2.2.0) - High-performance list component
- **react-native-fast-image** (8.6.3) - Optimized image loading
- **react-native-video** (6.17.0) - Video playback
- **react-native-svg** (15.14.0) - SVG support
- **react-native-vector-icons** (10.3.0) - Icon library

### Forms & Validation
- **react-hook-form** (7.66.0) - Form management
- **@hookform/resolvers** (5.2.2) - Form validation resolvers
- **yup** (1.7.1) - Schema validation

### Storage & Utilities
- **react-native-mmkv** (4.0.0) - Fast key-value storage
- **react-native-safe-area-context** (5.5.2) - Safe area handling
- **react-native-keyboard-controller** (1.19.5) - Keyboard management
- **react-native-toast-message** (2.3.3) - Toast notifications

## Project Structure

```
instagram_clone/
├── app/                          # Main application code
│   ├── assets/                  # Static assets (SVGs, images)
│   ├── constants/               # App constants (colors, dimensions, themes)
│   ├── core/                    # Core functionality
│   │   ├── components/          # Reusable UI components
│   │   │   ├── IGButton.tsx
│   │   │   ├── IGImageSlider.tsx
│   │   │   ├── IGInput.tsx
│   │   │   ├── IGList.tsx
│   │   │   ├── IGPost.tsx       # Feed post component
│   │   │   ├── IGSearchBar.tsx  # Search bar component
│   │   │   ├── IGSkeleton.tsx
│   │   │   └── IGText.tsx
│   │   ├── APIClient.ts         # API client configuration
│   │   └── server.ts            # MirageJS mock server
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useFeeds.ts          # Feeds data fetching hook
│   │   └── useTheme.ts
│   ├── models/                  # TypeScript type definitions
│   │   ├── auth.d.ts
│   │   └── feed.d.ts
│   ├── navigation/              # Navigation configuration
│   │   ├── AppNavigation.tsx
│   │   ├── AuthStack.tsx
│   │   └── ProtectedStack.tsx
│   ├── providers/               # Context providers
│   │   └── LoaderProvider.tsx
│   ├── screens/                 # Screen components
│   │   ├── home.tsx             # Main feeds screen
│   │   ├── login.tsx
│   │   └── profile.tsx
│   ├── store/                   # Redux store
│   │   ├── index.ts
│   │   └── slices/
│   └── utils/                   # Utility functions
│       └── validationSchemas.ts
├── feeds/                       # Feed data and video assets
│   ├── index.ts                 # Mock feed data generator
│   ├── videoMap.ts              # Video source mapping
│   └── videos/                  # Video files
├── android/                     # Android native code
├── ios/                         # iOS native code
├── scripts/                     # Build scripts
│   └── compressVideos.js
├── App.tsx                      # Root component
├── package.json
└── tsconfig.json
```

## Installation

### Prerequisites
- Node.js >= 20
- Yarn or npm
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instagram_clone
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro Bundler**
   ```bash
   yarn start
   # or
   npm start
   ```

## Running the App

### Android
```bash
yarn android
# or
npm run android
```

### iOS
```bash
yarn ios
# or
npm run ios
```

## Authentication

The app includes a simple authentication system:

### Default Credentials
- **Email**: `test@example.com`
- **Password**: `test123`

### How it Works
- Authentication is handled via MirageJS mock server
- Session is stored using MMKV for fast, persistent storage
- Protected routes require authentication
- Login screen is shown when no session exists

## API & Mock Server

The app uses **MirageJS** to mock API endpoints during development:

### Endpoints

#### POST `/api/login`
Login endpoint for user authentication.

**Request:**
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1",
      "email": "test@example.com",
      "username": "testuser",
      "fullName": "Test User",
      "avatar": null
    },
    "token": "mock-jwt-token-1"
  }
}
```

#### GET `/api/feeds`
Fetch paginated feeds with optional search.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `search` (string): Search query to filter feeds by name

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "0",
      "name": "example",
      "content": {
        "images": [
          "https://picsum.photos/1200/800?random=1",
          "https://picsum.photos/1200/800?random=2"
        ],
        "video": "1"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 200,
    "totalPages": 10,
    "hasMore": true
  }
}
```

## Key Components

### IGPost
Displays individual feed items with support for:
- Image galleries with swipeable slider
- Video playback (auto-plays when visible)
- Tall post variant for videos
- Skeleton loading state

### IGSearchBar
Animated search bar component with:
- Real-time search input
- Animated header that hides on scroll
- Clear button
- Debounced search queries

### HomeScreen
Main feeds screen featuring:
- Masonry grid layout (3 columns)
- Infinite scrolling with pagination
- Pull-to-refresh
- Viewport-based video playback
- Search functionality

## Development

### Available Scripts

- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android
- `yarn ios` - Run on iOS
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn type` - Type check with TypeScript
- `yarn compress-videos` - Compress video assets

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (if configured)

## Performance Optimizations

- **FlashList**: High-performance list rendering
- **Viewport-based rendering**: Only visible items are rendered
- **Video optimization**: Videos pause when not in viewport
- **Image optimization**: Fast Image for efficient image loading
- **Debounced search**: Reduces API calls during typing
- **Skeleton loading**: Better perceived performance

## Notes

- The app uses mock data generated with Faker.js
- Videos are stored locally in the `feeds/videos/` directory
- Images are fetched from Picsum Photos API
- The mock server (MirageJS) intercepts API calls in development
- Session persistence is handled via MMKV storage


