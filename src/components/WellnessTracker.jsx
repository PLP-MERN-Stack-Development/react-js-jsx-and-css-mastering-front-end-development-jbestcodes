import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

/**
 * Custom hook for managing wellness activities
 */
const useWellnessTracker = () => {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('devjourney-wellness');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('devjourney-wellness-stats');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default stats for new users - everything starts at 0
    return {
      totalWalks: 0,
      totalDistance: 0,
      averageMood: 0,
      streakDays: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('devjourney-wellness', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('devjourney-wellness-stats', JSON.stringify(stats));
  }, [stats]);

  const addActivity = (type, duration, mood, notes = '') => {
    const activity = {
      id: Date.now(),
      type,
      duration,
      mood,
      notes,
      date: new Date().toISOString(),
    };
    
    const updatedActivities = [activity, ...activities];
    setActivities(updatedActivities);
    
    // Update stats
    setStats(prev => {
      const newStats = { ...prev };
      
      if (type === 'walk') {
        newStats.totalWalks = prev.totalWalks + 1;
        newStats.totalDistance = Math.round((prev.totalDistance + (duration * 0.05)) * 10) / 10; // More realistic distance calculation
      }
      
      // Calculate average mood from all activities
      const totalMoodScore = updatedActivities.reduce((sum, act) => sum + act.mood, 0);
      newStats.averageMood = Math.round((totalMoodScore / updatedActivities.length) * 10) / 10;
      
      return newStats;
    });
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return { activities, stats, addActivity, deleteActivity };
};

/**
 * WellnessTracker component for tracking walks and mood
 */
const WellnessTracker = () => {
  const { activities, stats, addActivity, deleteActivity } = useWellnessTracker();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'walk',
    duration: '',
    mood: 5,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.duration) {
      addActivity(
        formData.type,
        parseFloat(formData.duration),
        parseInt(formData.mood),
        formData.notes
      );
      setFormData({ type: 'walk', duration: '', mood: 5, notes: '' });
      setShowForm(false);
    }
  };

  const getMoodEmoji = (mood) => {
    if (mood >= 9) return '😍';
    if (mood >= 7) return '😊';
    if (mood >= 5) return '😐';
    if (mood >= 3) return '😔';
    return '😢';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'walk': return '🚶‍♂️';
      case 'exercise': return '💪';
      case 'meditation': return '🧘‍♂️';
      case 'music': return '🎵';
      default: return '🌟';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-800 dark:text-green-600">{stats.totalWalks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Walks</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-red-900 dark:text-red-400">{stats.totalDistance.toFixed(1)}km</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Distance</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-800 dark:text-green-600">{stats.averageMood}/10</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Mood</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-red-900 dark:text-red-400">{stats.streakDays}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="🏃‍♂️ Wellness Activities">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={showForm ? 'secondary' : 'primary'}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Log Activity'}
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setFormData({ type: 'walk', duration: '30', mood: 8, notes: 'Quick walk to refresh' });
              addActivity('walk', 30, 8, 'Quick walk to refresh');
            }}
          >
            Quick Walk (30min)
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setFormData({ type: 'meditation', duration: '10', mood: 7, notes: 'Mindfulness break' });
              addActivity('meditation', 10, 7, 'Mindfulness break');
            }}
          >
            Meditation (10min)
          </Button>
        </div>

        {/* Activity Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activity Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="walk">🚶‍♂️ Walking</option>
                  <option value="exercise">💪 Exercise</option>
                  <option value="meditation">🧘‍♂️ Meditation</option>
                  <option value="music">🎵 Music Listening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="30"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood (1-10) {getMoodEmoji(formData.mood)}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>😢 Bad</span>
                <span className="font-medium">{formData.mood}</span>
                <span>😍 Great</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                rows="2"
                placeholder="How did it feel? Any thoughts?"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="primary">
                Log Activity
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* Recent Activities */}
      <Card title="📊 Recent Activities">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">🏃‍♂️</div>
            <p>No activities logged yet</p>
            <p className="text-sm">Start by logging your first wellness activity!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.slice(0, 10).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                      {activity.type} - {activity.duration} min
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString()} • 
                      Mood: {getMoodEmoji(activity.mood)} {activity.mood}/10
                    </div>
                    {activity.notes && (
                      <div className="text-sm text-gray-500 italic mt-1">
                        "{activity.notes}"
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteActivity(activity.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Wellness Tips */}
      <Card title="💡 Wellness Tips for Developers" variant="success">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🚶‍♂️</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Take Walking Breaks</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Step away from your desk every hour for a 5-10 minute walk.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🧘‍♂️</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Practice Mindfulness</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use meditation apps or simple breathing exercises to reduce stress.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🎵</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Listen to Music</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Boost your mood with your favorite tunes during breaks.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">💧</span>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Stay Hydrated</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keep a water bottle nearby and track your daily intake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WellnessTracker;