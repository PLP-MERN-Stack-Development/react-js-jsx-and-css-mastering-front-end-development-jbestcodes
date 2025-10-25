import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';

/**
 * Custom hook for managing coding progress with localStorage persistence
 */
const useLocalStorageCoding = () => {
  // Initialize state from localStorage or with empty arrays
  const [codingGoals, setCodingGoals] = useState(() => {
    const saved = localStorage.getItem('devjourney-coding-goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [languages, setLanguages] = useState(() => {
    const saved = localStorage.getItem('devjourney-languages');
    return saved ? JSON.parse(saved) : [
      // Empty by default - users will add their own languages
    ];
  });

  const [dailyStats, setDailyStats] = useState(() => {
    const saved = localStorage.getItem('devjourney-daily-stats');
    return saved ? JSON.parse(saved) : {
      todayHours: 0,
      weekStreak: 0,
      totalProjects: 0
    };
  });

  // Update localStorage when data changes
  useEffect(() => {
    console.log('💾 Saving coding goals to localStorage:', codingGoals);
    localStorage.setItem('devjourney-coding-goals', JSON.stringify(codingGoals));
  }, [codingGoals]);

  useEffect(() => {
    localStorage.setItem('devjourney-languages', JSON.stringify(languages));
  }, [languages]);

  useEffect(() => {
    console.log('💾 Saving daily stats to localStorage:', dailyStats);
    localStorage.setItem('devjourney-daily-stats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  // Add a new coding goal
  const addGoal = (text, priority = 'medium') => {
    console.log('📝 Adding goal:', text, priority);
    if (text.trim()) {
      const newGoal = {
        id: Date.now(),
        text,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
        type: 'coding'
      };
      console.log('🎯 New goal object:', newGoal);
      setCodingGoals([...codingGoals, newGoal]);
      console.log('📊 Updated goals list');
    } else {
      console.log('❌ Goal text is empty');
    }
  };

  // Toggle goal completion
  const toggleGoal = (id) => {
    setCodingGoals(
      codingGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  // Delete a goal
  const deleteGoal = (id) => {
    setCodingGoals(codingGoals.filter((goal) => goal.id !== id));
  };

  // Update language progress
  const updateLanguageProgress = (id, progress) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, progress: Math.min(100, Math.max(0, progress)) } : lang
      )
    );
  };

  // Add coding hours for today
  const addCodingHours = (hours) => {
    console.log('⏱️ Adding coding hours:', hours);
    setDailyStats(prev => {
      const updated = {
        ...prev,
        todayHours: prev.todayHours + hours
      };
      console.log('📈 Updated daily stats:', updated);
      return updated;
    });
  };

  return {
    codingGoals,
    languages,
    dailyStats,
    addGoal,
    toggleGoal,
    deleteGoal,
    updateLanguageProgress,
    addCodingHours
  };
};

/**
 * CodingTracker component for tracking development progress
 */
const CodingTracker = () => {
  const {
    codingGoals,
    languages,
    dailyStats,
    addGoal,
    toggleGoal,
    deleteGoal,
    updateLanguageProgress,
    addCodingHours
  } = useLocalStorageCoding();

  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [hoursToAdd, setHoursToAdd] = useState('');

  // Filter goals based on selected filter
  const filteredGoals = codingGoals.filter((goal) => {
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    if (filter === 'high') return goal.priority === 'high';
    return true; // 'all' filter
  });

  // Handle form submission for new goal
  const handleSubmitGoal = (e) => {
    e.preventDefault();
    console.log('🎯 Submitting goal:', newGoalText, newGoalPriority);
    addGoal(newGoalText, newGoalPriority);
    setNewGoalText('');
    setNewGoalPriority('medium');
    console.log('✅ Goal added successfully!');
  };

  // Handle adding coding hours
  const handleAddHours = (e) => {
    e.preventDefault();
    const hours = parseFloat(hoursToAdd);
    console.log('⏰ Adding hours:', hours);
    if (hours > 0) {
      addCodingHours(hours);
      setHoursToAdd('');
      console.log('✅ Hours added successfully!');
    } else {
      console.log('❌ Invalid hours value:', hoursToAdd);
    }
  };

  // Get priority color classes
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="gradient" className="text-center">
          <div className="text-2xl font-bold mb-1">{dailyStats.todayHours}h</div>
          <div className="text-sm opacity-90">Today's Coding</div>
        </Card>
        <Card variant="primary" className="text-center">
          <div className="text-2xl font-bold mb-1 text-red-900 dark:text-red-400">{dailyStats.weekStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
        </Card>
        <Card variant="success" className="text-center">
          <div className="text-2xl font-bold mb-1 text-green-800 dark:text-green-600">{dailyStats.totalProjects}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
        </Card>
      </div>

      {/* Quick Hours Logger */}
      <Card title="🕒 Log Coding Session">
        <form onSubmit={handleAddHours} className="flex gap-2">
          <input
            type="number"
            step="0.5"
            min="0"
            value={hoursToAdd}
            onChange={(e) => setHoursToAdd(e.target.value)}
            placeholder="Hours coded..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="success">
            Log Hours
          </Button>
        </form>
      </Card>

      {/* Language Progress */}
      <Card title="📚 Learning Progress">
        <div className="space-y-4">
          {languages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-semibold mb-2">Start Your Learning Journey!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add programming languages you're learning to track your progress
              </p>
              <Button 
                variant="primary" 
                onClick={() => {
                  const languageName = prompt('What programming language are you learning?');
                  if (languageName && languageName.trim()) {
                    const newLanguage = {
                      id: Date.now(),
                      name: languageName.trim(),
                      progress: 0,
                      hoursSpent: 0
                    };
                    setLanguages([...languages, newLanguage]);
                  }
                }}
              >
                + Add Your First Language
              </Button>
            </div>
          ) : (
            languages.map((lang) => (
              <div key={lang.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</span>
                  <span className="text-sm text-gray-500">{lang.progress}% • {lang.hoursSpent}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-red-900 to-green-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lang.progress}%` }}
                  ></div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateLanguageProgress(lang.id, lang.progress - 5)}
                  >
                    -5%
                  </Button>
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => updateLanguageProgress(lang.id, lang.progress + 5)}
                  >
                    +5%
                  </Button>
                </div>
              </div>
            ))
          )}
          {languages.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  const languageName = prompt('What programming language are you learning?');
                  if (languageName && languageName.trim()) {
                    const newLanguage = {
                      id: Date.now(),
                      name: languageName.trim(),
                      progress: 0,
                      hoursSpent: 0
                    };
                    setLanguages([...languages, newLanguage]);
                  }
                }}
              >
                + Add Another Language
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Coding Goals Manager */}
      <Card title="🎯 Coding Goals">
        {/* Goal input form */}
        <form onSubmit={handleSubmitGoal} className="mb-6 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="Add a coding goal..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <select
              value={newGoalPriority}
              onChange={(e) => setNewGoalPriority(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <Button type="submit" variant="primary">
              Add Goal
            </Button>
          </div>
        </form>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Goals
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'high' ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            High Priority
          </Button>
        </div>

        {/* Goals list */}
        <div className="space-y-2">
          {filteredGoals.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <div>No coding goals found</div>
              <div className="text-sm">Start by adding your first coding goal!</div>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center justify-between p-4 rounded-lg ${getPriorityColor(goal.priority)}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(goal.id)}
                    className="h-5 w-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <div>
                    <span
                      className={`${
                        goal.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}
                    >
                      {goal.text}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Priority: {goal.priority} • Created: {new Date(goal.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                  aria-label="Delete goal"
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Goals stats */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-red-900 dark:text-red-400">
                {codingGoals.filter((goal) => !goal.completed).length}
              </div>
              <div className="text-xs text-gray-500">Active Goals</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-800 dark:text-green-600">
                {codingGoals.filter((goal) => goal.completed).length}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {codingGoals.filter((goal) => goal.priority === 'high').length}
              </div>
              <div className="text-xs text-gray-500">High Priority</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CodingTracker;