# News Reader App

A React Native news reader application that displays the latest headlines from NewsAPI and allows users to bookmark their favorite articles.

## Features

- **Home Screen**: Displays latest news articles with thumbnails, titles, and descriptions
- **Article Detail**: Full article view with bookmark functionality
- **Bookmarks**: Save and manage your favorite articles
- **Pull to Refresh**: Refresh news feed by pulling down
- **Persistent Storage**: Bookmarks are saved using AsyncStorage
- **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Node.js (>= 18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get NewsAPI Key

1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key
4. Update `config/api.ts` and replace `YOUR_API_KEY_HERE` with your actual API key

```typescript
// In config/api.ts
export const API_CONFIG = {
  NEWS_API_KEY: 'your_actual_api_key_here',
  // ... other config
};
```

### 3. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Run the App

#### Android
```bash
npm run android
```

#### iOS (macOS only)
```bash
npm run ios
```

## Project Structure

```
├── components/
│   └── NewsCard.tsx          # Reusable article card component
├── screens/
│   ├── HomeScreen.tsx        # Main news feed screen
│   ├── ArticleDetailScreen.tsx # Article detail view
│   └── BookmarksScreen.tsx   # Saved articles screen
├── services/
│   ├── newsService.ts        # API calls to NewsAPI
│   └── bookmarkService.ts    # AsyncStorage operations
├── config/
│   └── api.ts               # API configuration
├── types.ts                  # TypeScript interfaces
└── App.tsx                   # Main app component with navigation
```

## API Configuration

The app uses NewsAPI.org for fetching news articles. You need to:

1. Get a free API key from [NewsAPI.org](https://newsapi.org/)
2. Update the `NEWS_API_KEY` in `config/api.ts`

## Features Implementation

### News Fetching
- Uses NewsAPI.org for top headlines
- Supports country-specific news (default: US)
- Error handling for network requests

### Bookmark System
- Toggle bookmark status on articles
- Persistent storage using AsyncStorage
- Real-time bookmark status updates
- Dedicated bookmarks screen

### Navigation
- Bottom tab navigation (News & Bookmarks)
- Stack navigation for article details
- Proper TypeScript typing for navigation

### UI/UX
- Modern card-based design
- Loading states and error handling
- Pull-to-refresh functionality
- Responsive image handling
- Clean typography and spacing

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure you've updated the API key in `config/api.ts`
2. **Network Issues**: Check your internet connection and API key validity
3. **Build Errors**: Ensure all dependencies are properly installed

### Development

- Run `npm start` to start the Metro bundler
- Use `npm run lint` to check for code issues
- Use `npm test` to run tests

## Dependencies

- React Navigation (Stack & Bottom Tabs)
- AsyncStorage for data persistence
- Axios for API calls
- React Native Vector Icons
- TypeScript for type safety

## License

This project is for educational purposes.
#   N e w s _ a p p  
 #   N e w s _ a p p  
 #   N e w s _ A p p _ P r o j e c t  
 #   N e w s _ A p p _ P r o j e c t  
 #   N e w s _ A p p _ P r o j e c t  
 #   N e w s _ A p p _ P r o j e c t  
 #   N e w s _ A p p _ P r o j e c t  
 #   n e w s _ a p p  
 