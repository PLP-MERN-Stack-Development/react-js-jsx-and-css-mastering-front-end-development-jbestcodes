# 🚀 DevJourney Tracker

A personalized development tracking application built with React.js and Tailwind CSS. Track your coding progress, wellness activities, discover music, and stay motivated on your journey to becoming a great developer!

## 🌟 Features

### 💻 Coding Progress Tracking
- **Daily Coding Sessions**: Log hours spent coding
- **Language Learning Progress**: Track progress in JavaScript, React, CSS, and more
- **Coding Goals Management**: Set and track coding goals with priority levels
- **Skill Development**: Visual progress bars for different programming languages
- **Project Tracking**: Monitor your development projects

### 🏃‍♂️ Wellness & Mood Tracking
- **Walking Logger**: Track your walks and physical activities
- **Mood Tracking**: Rate and monitor your daily mood (1-10 scale)
- **Activity Types**: Walking, exercise, meditation, music listening
- **Wellness Stats**: Total walks, average mood, activity streaks
- **Health Tips**: Curated wellness tips for developers

### 🎵 Music Discovery
- **Coding Playlists**: Discover music perfect for coding sessions
- **Mood-Based Recommendations**: Get music suggestions based on your coding activity
- **Genre Exploration**: Ambient, Electronic, Lo-Fi, Classical, Synthwave
- **Listening Stats**: Track your music listening habits
- **Focus Music**: Specially curated tracks for deep concentration

### 💡 Daily Motivation
- **Inspirational Quotes**: Daily dose of motivation from successful people
- **Category-Based Quotes**: Browse quotes by motivation, success, wisdom, perseverance
- **Coding Tips**: Random productivity tips for developers
- **Goal Visualization**: Visual progress tracking for motivation

### ⚡ Quick Actions
- **Fast Entry System**: Modal-based quick entry for common actions
- **Coding Sessions**: Quickly log coding hours and sessions
- **Wellness Activities**: Fast logging of walks and mood updates
- **Music Tracking**: Quick music activity logging
- **Goal Setting**: Rapid goal creation with priority selection
- **One-Click Access**: Available from any section of the app

### 🎨 Modern Design
- **Custom Theme**: Beautiful maroon and green color scheme
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Engaging transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠️ Technologies Used

- **React.js 18+** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Context API** - State management for theme and app data
- **Local Storage** - Data persistence without backend
- **REST APIs** - Integration with external APIs for quotes and data
- **PropTypes** - Runtime type checking for React props

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Custom button with theme variants
│   ├── Card.jsx        # Content container component
│   ├── Navbar.jsx      # Main navigation with theme toggle
│   ├── Footer.jsx      # Footer with links and info
│   ├── Dashboard.jsx   # Main dashboard layout
│   ├── CodingTracker.jsx # Coding progress tracker
│   ├── WellnessTracker.jsx # Wellness and mood tracker
│   ├── MusicDiscovery.jsx # Music exploration component
│   ├── MotivationQuotes.jsx # Daily quotes and inspiration
│   ├── QuickActions.jsx # Modal-based quick entry system
│   └── TaskManager.jsx # Task management component
├── context/            # React context providers
│   ├── ThemeContext.jsx # Dark/light theme management
│   └── NavigationContext.jsx # App navigation state
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js # localStorage state management
├── api/                # API integration services
│   ├── quotesApi.js    # Quotable API for inspirational quotes
│   ├── githubApi.js    # GitHub API for coding stats
│   └── musicApi.js     # Music discovery API simulation
├── utils/              # Utility functions
│   └── dataUtils.js    # Data management utilities
├── pages/              # Page components (for future routing)
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd react-js-jsx-and-css-mastering-front-end-development-jbestcodes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🎯 Usage Guide

### Getting Started with DevJourney

1. **Set Your Theme**: Use the theme toggle in the navbar to switch between light and dark modes
2. **Explore the Dashboard**: Start with the overview to see your progress summary
3. **Log Coding Sessions**: Use the Coding section to track your programming activities
4. **Track Wellness**: Log walks and rate your mood in the Wellness section
5. **Discover Music**: Find the perfect coding soundtrack in the Music section
6. **Stay Motivated**: Get daily inspiration from the Motivation section

### Key Features

#### Coding Tracker
- Add coding goals with priority levels (low, medium, high)
- Log daily coding hours
- Track progress in different programming languages
- Filter goals by status and priority

#### Wellness Tracker
- Log different activity types (walking, exercise, meditation)
- Rate your mood on a 1-10 scale
- Track activity streaks and statistics
- Get personalized wellness tips

#### Music Discovery
- Browse curated coding playlists
- Search music by mood or genre
- Get recommendations based on coding activity
- Track listening statistics

## 🔧 Customization

### Changing Colors
The app uses a custom maroon and green theme. To modify colors, update the Tailwind classes in:
- `src/components/Button.jsx` - Button color variants
- CSS custom properties for consistent theming
- Gradient backgrounds in various components

### Adding New Features
1. Create new components in `src/components/`
2. Add API integrations in `src/api/`
3. Use the existing hooks and utilities for consistency
4. Follow the established component patterns

### API Integration
Currently uses sample data and free APIs. To integrate with real services:
- **Spotify**: Replace music API with Spotify Web API
- **GitHub**: Use real GitHub usernames for coding stats
- **Fitness Trackers**: Integrate with health APIs for wellness data

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large Screens**: 1280px and up

## 🔒 Data Privacy

- All data is stored locally in your browser's localStorage
- No personal data is sent to external servers
- API calls are limited to public endpoints for quotes and sample data
- You have full control over your data

## 🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🎉 Acknowledgments

- Quotable API for inspirational quotes
- Tailwind CSS for the amazing utility-first framework
- React team for the excellent library
- All the open-source contributors who make development possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for aspiring developers on their coding journey**

*Keep coding, keep growing! 🚀* 