import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { trackMusicActivity } from '../api/musicApi';

/**
 * Quick Modal component for rapid actions
 */
const QuickModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Quick Actions Modal Manager
 */
const QuickActions = ({ onDataUpdate }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    hours: '',
    walkDuration: '',
    mood: 8,
    goal: '',
    priority: 'medium'
  });

  const closeModal = () => {
    setActiveModal(null);
    setFormData({
      hours: '',
      walkDuration: '',
      mood: 8,
      goal: '',
      priority: 'medium'
    });
  };

  const handleCodingSession = (e) => {
    e.preventDefault();
    if (formData.hours) {
      // Add to localStorage directly
      const currentStats = JSON.parse(localStorage.getItem('devjourney-daily-stats') || '{"todayHours": 0, "weekStreak": 3, "totalProjects": 5}');
      currentStats.todayHours += parseFloat(formData.hours);
      localStorage.setItem('devjourney-daily-stats', JSON.stringify(currentStats));
      
      console.log('✅ Quick Action: Added coding session', formData.hours, 'hours');
      closeModal();
      onDataUpdate?.();
    }
  };

  const handleWalk = (e) => {
    e.preventDefault();
    if (formData.walkDuration) {
      // Add to wellness activities
      const currentActivities = JSON.parse(localStorage.getItem('devjourney-wellness') || '[]');
      currentActivities.push({
        id: Date.now(),
        type: 'walk',
        duration: parseInt(formData.walkDuration),
        mood: formData.mood,
        timestamp: new Date().toISOString(),
        notes: `${formData.walkDuration} min walk - Mood: ${formData.mood}/10`
      });
      localStorage.setItem('devjourney-wellness', JSON.stringify(currentActivities));
      
      console.log('✅ Quick Action: Added walk', formData.walkDuration, 'minutes');
      closeModal();
      onDataUpdate?.();
    }
  };

  const handleGoal = (e) => {
    e.preventDefault();
    if (formData.goal) {
      // Add to coding goals
      const currentGoals = JSON.parse(localStorage.getItem('devjourney-coding-goals') || '[]');
      currentGoals.push({
        id: Date.now(),
        text: formData.goal,
        priority: formData.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        type: 'coding'
      });
      localStorage.setItem('devjourney-coding-goals', JSON.stringify(currentGoals));
      
      console.log('✅ Quick Action: Added goal', formData.goal);
      closeModal();
      onDataUpdate?.();
    }
  };

  const musicPlaylists = [
    { name: "Deep Focus", genre: "Ambient", duration: "2h", emoji: "🎧" },
    { name: "Coding Jazz", genre: "Jazz", duration: "1.5h", emoji: "🎷" },
    { name: "Lo-Fi Beats", genre: "Lo-Fi", duration: "3h", emoji: "🎵" },
    { name: "Classical Focus", genre: "Classical", duration: "2.5h", emoji: "🎼" },
    { name: "Electronic Energy", genre: "Electronic", duration: "1h", emoji: "⚡" }
  ];

  return (
    <>
      {/* Quick Actions Buttons */}
      <Card title="🎯 Quick Actions" variant="primary">
        <div className="space-y-3">
          <Button 
            variant="primary" 
            className="w-full justify-start"
            onClick={() => setActiveModal('coding')}
          >
            ➕ Add Coding Session
          </Button>
          <Button 
            variant="accent" 
            className="w-full justify-start"
            onClick={() => setActiveModal('walk')}
          >
            🚶‍♂️ Log a Walk
          </Button>
          <Button 
            variant="success" 
            className="w-full justify-start"
            onClick={() => setActiveModal('music')}
          >
            🎵 Find Focus Music
          </Button>
          <Button 
            variant="secondary" 
            className="w-full justify-start"
            onClick={() => setActiveModal('goal')}
          >
            📚 Set Learning Goal
          </Button>
        </div>
      </Card>

      {/* Coding Session Modal */}
      <QuickModal
        isOpen={activeModal === 'coding'}
        onClose={closeModal}
        title="⏰ Quick Coding Session"
      >
        <form onSubmit={handleCodingSession} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hours coded:</label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="12"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
              placeholder="e.g., 2.5"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary" className="flex-1">
              Log Session
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </QuickModal>

      {/* Walk Modal */}
      <QuickModal
        isOpen={activeModal === 'walk'}
        onClose={closeModal}
        title="🚶‍♂️ Quick Walk Log"
      >
        <form onSubmit={handleWalk} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes):</label>
            <input
              type="number"
              min="5"
              max="120"
              value={formData.walkDuration}
              onChange={(e) => setFormData(prev => ({ ...prev, walkDuration: e.target.value }))}
              placeholder="e.g., 30"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mood (1-10):</label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.mood}
              onChange={(e) => setFormData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="text-center text-lg">{formData.mood}/10 😊</div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="success" className="flex-1">
              Log Walk
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </QuickModal>

      {/* Music Modal */}
      <QuickModal
        isOpen={activeModal === 'music'}
        onClose={closeModal}
        title="🎵 Focus Music Playlists"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Great music to boost your coding focus:
          </p>
          {musicPlaylists.map((playlist, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{playlist.emoji}</span>
                <div>
                  <div className="font-medium">{playlist.name}</div>
                  <div className="text-sm text-gray-500">{playlist.genre} • {playlist.duration}</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="accent"
                onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(playlist.name)}`, '_blank')}
              >
                Play
              </Button>
            </div>
          ))}
          <div className="mt-4">
            <Button variant="secondary" onClick={closeModal} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </QuickModal>

      {/* Goal Modal */}
      <QuickModal
        isOpen={activeModal === 'goal'}
        onClose={closeModal}
        title="📚 Quick Learning Goal"
      >
        <form onSubmit={handleGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Learning Goal:</label>
            <input
              type="text"
              value={formData.goal}
              onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="e.g., Master React Hooks"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Priority:</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="primary" className="flex-1">
              Add Goal
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </QuickModal>
    </>
  );
};

export default QuickActions;