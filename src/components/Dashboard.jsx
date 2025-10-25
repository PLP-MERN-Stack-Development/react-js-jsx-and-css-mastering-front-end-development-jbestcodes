import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import CodingTracker from './CodingTracker';
import WellnessTracker from './WellnessTracker';
import MusicDiscovery from './MusicDiscovery';
import MotivationQuotes from './MotivationQuotes';
import QuickActions from './QuickActions';
import { useNavigation } from '../context/NavigationContext';
import { fetchRandomQuote } from '../api/quotesApi';

/**
 * Dashboard component - main hub for DevJourney app
 */
const Dashboard = () => {
  const { activeSection, setActiveSection } = useNavigation();
  const [dailyQuote, setDailyQuote] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger data refresh
  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch daily quote on component mount
  useEffect(() => {
    const loadDailyQuote = async () => {
      try {
        console.log('🔄 Loading daily quote...');
        const quote = await fetchRandomQuote();
        console.log('✅ Quote loaded:', quote);
        setDailyQuote(quote);
      } catch (error) {
        console.error('❌ Error loading quote:', error);
        // Set a default quote if API fails
        setDailyQuote({
          content: "Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown.",
          author: "Robin Sharma",
          tags: ["motivational"]
        });
      }
    };
    loadDailyQuote();
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getProductivityTip = () => {
    const tips = [
      "💡 Take a 5-minute break every 25 minutes (Pomodoro Technique)",
      "🎯 Set one main goal for today and focus on completing it",
      "🌱 Learn something new for 15 minutes - it adds up quickly!",
      "🚶‍♂️ A quick walk can boost your creativity and problem-solving",
      "🎵 Try coding with instrumental music to improve focus",
      "📝 Document your learning journey - future you will thank you!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'coding':
        return <CodingTracker />;
      case 'wellness':
        return <WellnessTracker />;
      case 'music':
        return <MusicDiscovery />;
      case 'motivation':
        return <MotivationQuotes />;
      default:
        return <OverviewSection dailyQuote={dailyQuote} currentTime={currentTime} onDataUpdate={handleDataUpdate} refreshTrigger={refreshTrigger} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-green-800 text-white rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getGreeting()}, Developer! 👋
            </h1>
            <p className="text-red-100 mb-2">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-red-200">
              {getProductivityTip()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <div className="text-sm text-red-200">
              Keep coding, keep growing! 🚀
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Card>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeSection === 'overview' ? 'primary' : 'secondary'}
            onClick={() => setActiveSection('overview')}
            className="flex-1 sm:flex-none"
          >
            📊 Overview
          </Button>
          <Button
            variant={activeSection === 'coding' ? 'primary' : 'secondary'}
            onClick={() => setActiveSection('coding')}
            className="flex-1 sm:flex-none"
          >
            💻 Coding
          </Button>
          <Button
            variant={activeSection === 'wellness' ? 'primary' : 'secondary'}
            onClick={() => setActiveSection('wellness')}
            className="flex-1 sm:flex-none"
          >
            🏃‍♂️ Wellness
          </Button>
          <Button
            variant={activeSection === 'music' ? 'primary' : 'secondary'}
            onClick={() => setActiveSection('music')}
            className="flex-1 sm:flex-none"
          >
            🎵 Music
          </Button>
          <Button
            variant={activeSection === 'motivation' ? 'primary' : 'secondary'}
            onClick={() => setActiveSection('motivation')}
            className="flex-1 sm:flex-none"
          >
            💡 Motivation
          </Button>
        </div>
      </Card>

      {/* Main Content */}
      {renderActiveSection()}
    </div>
  );
};

/**
 * Overview section component
 */
const OverviewSection = ({ dailyQuote, currentTime, onDataUpdate, refreshTrigger }) => {
  // Local state and effects for dynamic updates
  // Get sample stats from localStorage or defaults
  const getCodingStats = () => {
    const saved = localStorage.getItem('devjourney-daily-stats');
    return saved ? JSON.parse(saved) : {
      todayHours: 0,
      weekStreak: 0,
      totalProjects: 0
    };
  };

  const getWellnessStats = () => {
    const saved = localStorage.getItem('devjourney-wellness-stats');
    return saved ? JSON.parse(saved) : {
      totalWalks: 0,
      averageMood: 0,
      streakDays: 0
    };
  };

  // Refresh stats when data updates
  const [codingStats, setCodingStats] = useState(getCodingStats());
  const [wellnessStats, setWellnessStats] = useState(getWellnessStats());

  useEffect(() => {
    setCodingStats(getCodingStats());
    setWellnessStats(getWellnessStats());
  }, [refreshTrigger]);

  // Check if user is new (no data)
  const isNewUser = codingStats.todayHours === 0 && 
                   codingStats.weekStreak === 0 && 
                   codingStats.totalProjects === 0 &&
                   wellnessStats.totalWalks === 0;

  return (
    <div className="space-y-6">
      {/* Welcome Message for New Users */}
      {isNewUser && (
        <Card title="🎉 Welcome to DevJourney!" variant="gradient">
          <div className="text-white text-center">
            <p className="text-lg mb-4">
              Your personal coding adventure starts here! Track your progress, stay healthy, and discover great music for coding.
            </p>
            <p className="text-red-200 text-sm">
              Start by using the Quick Actions below to log your first coding session or set a learning goal! 🚀
            </p>
          </div>
        </Card>
      )}

      {/* Daily Quote */}
      {dailyQuote && (
        <Card title="💭 Daily Inspiration" variant="gradient">
          <blockquote className="text-lg italic text-center text-white mb-3">
            "{dailyQuote.content}"
          </blockquote>
          <cite className="block text-center text-red-200">
            — {dailyQuote.author}
          </cite>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-3xl mb-2">💻</div>
          <div className="text-2xl font-bold text-red-900 dark:text-red-400">{codingStats.todayHours}h</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Today's Coding</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-green-800 dark:text-green-600">{codingStats.weekStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-2">🚶‍♂️</div>
          <div className="text-2xl font-bold text-red-900 dark:text-red-400">{wellnessStats.totalWalks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Walks</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-2">😊</div>
          <div className="text-2xl font-bold text-green-800 dark:text-green-600">
            {wellnessStats.averageMood > 0 ? `${wellnessStats.averageMood}/10` : '–'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Mood</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions onDataUpdate={onDataUpdate} />

        <Card title="📈 Progress Summary" variant="success">
          <div className="space-y-4">
            {isNewUser ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="font-semibold mb-2">Ready to Start Growing?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your progress will appear here as you start logging activities and setting goals!
                </p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Weekly Coding Goal</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{codingStats.todayHours}h / 20h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-red-900 to-green-800 h-2 rounded-full" style={{ width: `${Math.min(100, (codingStats.todayHours / 20) * 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Current Streak</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{codingStats.weekStreak} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-green-800 to-green-600 h-2 rounded-full" style={{ width: `${Math.min(100, (codingStats.weekStreak / 7) * 100)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Wellness Activities</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{wellnessStats.totalWalks} walks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-red-900 to-red-700 h-2 rounded-full" style={{ width: `${Math.min(100, (wellnessStats.totalWalks / 10) * 100)}%` }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card title="📝 Recent Activity">
        {isNewUser ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold mb-2">Activity Feed Coming Soon!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              As you log coding sessions, walks, and achieve goals, they'll appear here as your activity feed.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-2xl">💻</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  Ready to start tracking!
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Use Quick Actions to log your activities
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;