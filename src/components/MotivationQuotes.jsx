import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import { fetchRandomQuote, fetchQuotesByTag } from '../api/quotesApi';

/**
 * MotivationQuotes component for displaying inspirational quotes
 */
const MotivationQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [userQuotes, setUserQuotes] = useState(() => {
    const saved = localStorage.getItem('devjourney-user-quotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState('motivational');
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({ content: '', author: '', tags: '' });

  const quoteTags = [
    'motivational',
    'inspirational', 
    'success',
    'wisdom',
    'perseverance'
  ];

  // Save user quotes to localStorage
  useEffect(() => {
    localStorage.setItem('devjourney-user-quotes', JSON.stringify(userQuotes));
  }, [userQuotes]);

  // Fetch a random quote on component mount
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // Fetch a new random quote
  const fetchNewQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // First try to get a quote from API
      const quote = await fetchRandomQuote();
      setCurrentQuote(quote);
    } catch (err) {
      console.error('Failed to fetch quote:', err);
      // If API fails, show a random user quote or fallback
      if (userQuotes.length > 0) {
        const randomUserQuote = userQuotes[Math.floor(Math.random() * userQuotes.length)];
        setCurrentQuote(randomUserQuote);
      } else {
        setCurrentQuote({
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          tags: ["motivational"]
        });
      }
      setError('Using offline quote - API temporarily unavailable');
    } finally {
      setLoading(false);
    }
  };

  // Add user quote
  const addUserQuote = (e) => {
    e.preventDefault();
    if (newQuote.content.trim() && newQuote.author.trim()) {
      const quote = {
        id: Date.now(),
        content: newQuote.content.trim(),
        author: newQuote.author.trim(),
        tags: newQuote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isUserQuote: true,
        dateAdded: new Date().toISOString()
      };
      setUserQuotes(prev => [quote, ...prev]);
      setNewQuote({ content: '', author: '', tags: '' });
      setShowAddQuote(false);
      // Also set as current quote
      setCurrentQuote(quote);
    }
  };

  // Delete user quote
  const deleteUserQuote = (id) => {
    setUserQuotes(prev => prev.filter(quote => quote.id !== id));
  };

  // Fetch quotes by tag
  const fetchQuotesBySelectedTag = async (tag) => {
    setLoading(true);
    setError(null);
    setSelectedTag(tag);
    try {
      const tagQuotes = await fetchQuotesByTag(tag, 5);
      setQuotes(tagQuotes);
    } catch (err) {
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Motivation Quote */}
      <Card title="💡 Daily Motivation" variant="primary">
        {loading && !currentQuote ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading inspiration...</p>
          </div>
        ) : error && !currentQuote ? (
          <div className="text-center py-4 text-red-600 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : currentQuote ? (
          <div className="text-center space-y-4">
            <blockquote className="text-lg italic text-gray-800 dark:text-gray-200">
              "{currentQuote.content}"
            </blockquote>
            <cite className="text-red-900 dark:text-red-400 font-medium">
              — {currentQuote.author}
            </cite>
            {currentQuote.tags && (
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {currentQuote.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : null}
        
        <div className="mt-4 text-center space-x-2">
          <Button 
            variant="accent" 
            onClick={fetchNewQuote}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'New Quote'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setShowAddQuote(!showAddQuote)}
          >
            {showAddQuote ? 'Cancel' : 'Add Your Quote'}
          </Button>
        </div>

        {/* Add Quote Form */}
        {showAddQuote && (
          <form onSubmit={addUserQuote} className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quote Content *
              </label>
              <textarea
                value={newQuote.content}
                onChange={(e) => setNewQuote({ ...newQuote, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                rows="3"
                placeholder="Enter your inspirational quote..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Quote author"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  value={newQuote.tags}
                  onChange={(e) => setNewQuote({ ...newQuote, tags: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="motivational, success, wisdom"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="primary">
                Add Quote
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowAddQuote(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* User's Personal Quotes */}
      {userQuotes.length > 0 && (
        <Card title="✨ Your Personal Quotes">
          <div className="space-y-3">
            {userQuotes.slice(0, 5).map((quote) => (
              <div
                key={quote.id}
                className="p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-red-900/20 dark:to-green-900/20 rounded-lg border-l-4 border-red-900"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <blockquote className="text-gray-700 dark:text-gray-300 italic">
                      "{quote.content}"
                    </blockquote>
                    <cite className="text-red-900 dark:text-red-400 font-medium text-sm mt-2 block">
                      — {quote.author}
                    </cite>
                    {quote.tags && quote.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {quote.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUserQuote(quote.id)}
                    className="ml-3"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quote Categories */}
      <Card title="🎯 Browse by Category">
        <div className="space-y-4">
          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">
            {quoteTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => fetchQuotesBySelectedTag(tag)}
                disabled={loading}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Button>
            ))}
          </div>

          {/* Loading state for category quotes */}
          {loading && quotes.length === 0 && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-900 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading quotes...</p>
            </div>
          )}

          {/* Error state */}
          {error && quotes.length === 0 && (
            <div className="text-center py-4 text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
          )}

          {/* Quotes list */}
          {quotes.length > 0 && (
            <div className="space-y-3">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-green-800"
                >
                  <blockquote className="text-gray-700 dark:text-gray-300 italic">
                    "{quote.content}"
                  </blockquote>
                  <cite className="text-green-800 dark:text-green-600 font-medium text-sm mt-2 block">
                    — {quote.author}
                  </cite>
                  {quote.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {quote.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && quotes.length === 0 && selectedTag && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">💭</div>
              <p>Click a category above to explore quotes!</p>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="🚀 Coding Motivation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-lg">
            <div className="text-2xl mb-2">💻</div>
            <h3 className="font-semibold mb-1">Daily Coding Goal</h3>
            <p className="text-sm opacity-90">Stay consistent, code every day</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-800 to-green-700 text-white rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold mb-1">Learning Progress</h3>
            <p className="text-sm opacity-90">Track your skill development</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MotivationQuotes;