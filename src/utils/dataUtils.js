/**
 * Utility functions for DevJourney app
 */

/**
 * Clear all user data and reset to defaults
 * Useful for testing or starting fresh
 */
export const resetAllData = () => {
  const keys = [
    'devjourney-coding-goals',
    'devjourney-languages',
    'devjourney-daily-stats',
    'devjourney-wellness',
    'devjourney-wellness-stats',
    'devjourney-theme'
  ];
  
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  console.log('✅ All DevJourney data has been reset!');
  
  // Reload the page to see fresh state
  window.location.reload();
};

/**
 * Export user data for backup
 */
export const exportUserData = () => {
  const data = {
    codingGoals: JSON.parse(localStorage.getItem('devjourney-coding-goals') || '[]'),
    languages: JSON.parse(localStorage.getItem('devjourney-languages') || '[]'),
    dailyStats: JSON.parse(localStorage.getItem('devjourney-daily-stats') || '{}'),
    wellness: JSON.parse(localStorage.getItem('devjourney-wellness') || '[]'),
    wellnessStats: JSON.parse(localStorage.getItem('devjourney-wellness-stats') || '{}'),
    theme: localStorage.getItem('devjourney-theme') || 'light',
    exportDate: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `devjourney-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
  console.log('✅ Data exported successfully!');
};

/**
 * Get data summary for debugging
 */
export const getDataSummary = () => {
  const summary = {
    codingGoals: JSON.parse(localStorage.getItem('devjourney-coding-goals') || '[]').length,
    languages: JSON.parse(localStorage.getItem('devjourney-languages') || '[]').length,
    wellnessActivities: JSON.parse(localStorage.getItem('devjourney-wellness') || '[]').length,
    dailyStats: JSON.parse(localStorage.getItem('devjourney-daily-stats') || '{}'),
    theme: localStorage.getItem('devjourney-theme') || 'light'
  };
  
  console.table(summary);
  return summary;
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  window.DevJourney = {
    resetAllData,
    exportUserData,
    getDataSummary
  };
}