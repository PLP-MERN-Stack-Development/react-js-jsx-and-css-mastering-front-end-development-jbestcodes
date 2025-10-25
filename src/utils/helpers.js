/**
 * Utility functions for the DevJourney app
 */

/**
 * Format date to a readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

/**
 * Format duration from minutes to human readable format
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration (e.g., "2h 30m")
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  const timeUnits = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];
  
  for (const { unit, seconds } of timeUnits) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

/**
 * Generate a random ID
 * @param {number} length - Length of the ID
 * @returns {string} Random ID string
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Calculate progress percentage
 * @param {number} current - Current value
 * @param {number} total - Total value
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (current, total) => {
  if (total === 0) return 0;
  return clamp((current / total) * 100, 0, 100);
};

/**
 * Get mood emoji based on numeric value
 * @param {number} mood - Mood value (1-10)
 * @returns {string} Emoji representing the mood
 */
export const getMoodEmoji = (mood) => {
  const moodMap = {
    1: '😢', 2: '😔', 3: '🙁', 4: '😐', 5: '😐',
    6: '🙂', 7: '😊', 8: '😊', 9: '😍', 10: '🤩'
  };
  return moodMap[Math.round(clamp(mood, 1, 10))] || '😐';
};

/**
 * Get color class based on progress value
 * @param {number} progress - Progress value (0-100)
 * @returns {string} Tailwind color class
 */
export const getProgressColor = (progress) => {
  if (progress >= 80) return 'text-green-600';
  if (progress >= 60) return 'text-yellow-600';
  if (progress >= 40) return 'text-orange-600';
  return 'text-red-600';
};

/**
 * Get priority color classes
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {Object} Object with background and text color classes
 */
export const getPriorityColors = (priority) => {
  const colorMap = {
    low: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-green-500'
    },
    medium: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-500'
    },
    high: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      border: 'border-red-500'
    }
  };
  return colorMap[priority] || colorMap.medium;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get greeting based on time of day
 * @param {Date} date - Date to get greeting for (defaults to now)
 * @returns {string} Greeting message
 */
export const getTimeBasedGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Generate random motivational coding tip
 * @returns {string} Random coding tip
 */
export const getRandomCodingTip = () => {
  const tips = [
    "💡 Take regular breaks to prevent burnout and maintain focus",
    "🎯 Break large problems into smaller, manageable tasks",
    "📝 Write comments for your future self - you'll thank yourself later",
    "🔍 Use meaningful variable and function names for better readability",
    "🧪 Test your code frequently to catch bugs early",
    "📚 Learn one new thing every day, even if it's small",
    "🤝 Don't hesitate to ask for help when you're stuck",
    "🔄 Refactor your code regularly to keep it clean and maintainable",
    "🎵 Find your coding playlist - music can boost productivity",
    "🌱 Embrace mistakes as learning opportunities"
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

export default {
  formatDate,
  formatDuration,
  getRelativeTime,
  generateId,
  debounce,
  clamp,
  calculateProgress,
  getMoodEmoji,
  getProgressColor,
  getPriorityColors,
  isValidEmail,
  getTimeBasedGreeting,
  getRandomCodingTip
};