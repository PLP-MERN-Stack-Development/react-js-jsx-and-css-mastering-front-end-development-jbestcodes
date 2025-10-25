import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import {
  fetchCodingPlaylists,
  fetchPlaylistTracks,
  searchMusic,
  getMusicRecommendations,
  getListeningStats
} from '../api/musicApi';

/**
 * MusicDiscovery component for finding coding music
 */
const MusicDiscovery = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [listeningStats, setListeningStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('playlists');

  // Fetch initial data
  useEffect(() => {
    loadPlaylists();
    loadListeningStats();
    loadRecommendations();
  }, []);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const data = await fetchCodingPlaylists();
      setPlaylists(data);
    } catch (err) {
      setError('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const loadListeningStats = async () => {
    try {
      const stats = await getListeningStats();
      setListeningStats(stats);
    } catch (err) {
      console.error('Failed to load listening stats:', err);
    }
  };

  const loadRecommendations = async () => {
    try {
      const recs = await getMusicRecommendations('general');
      setRecommendations(recs);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    }
  };

  const handlePlaylistClick = async (playlist) => {
    setSelectedPlaylist(playlist);
    setLoading(true);
    try {
      const playlistTracks = await fetchPlaylistTracks(playlist.id);
      setTracks(playlistTracks);
    } catch (err) {
      setError('Failed to load tracks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchMusic(searchQuery);
      setSearchResults(results);
      setActiveTab('search');
    } catch (err) {
      setError('Failed to search music');
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationTypeChange = async (type) => {
    setLoading(true);
    try {
      const recs = await getMusicRecommendations(type);
      setRecommendations(recs);
    } catch (err) {
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Listening Stats */}
      {listeningStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-900 dark:text-red-400">{listeningStats.totalHours}h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Listening</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-800 dark:text-green-600">{listeningStats.codingPlaytime}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Coding Time</div>
          </Card>
          <Card className="text-center">
            <div className="text-lg font-bold text-red-900 dark:text-red-400">{listeningStats.favoriteGenre}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Top Genre</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-800 dark:text-green-600">{listeningStats.playlists}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Playlists</div>
          </Card>
        </div>
      )}

      {/* Search */}
      <Card title="🔍 Discover Music">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by mood, genre, or artist..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary" disabled={loading}>
            Search
          </Button>
        </form>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4">
          <Button
            variant={activeTab === 'playlists' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('playlists')}
          >
            Playlists
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('recommendations')}
          >
            For You
          </Button>
          {searchResults.length > 0 && (
            <Button
              variant={activeTab === 'search' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab('search')}
            >
              Search Results
            </Button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading music...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-600 dark:text-red-400">
            <p>{error}</p>
          </div>
        )}

        {/* Playlists Tab */}
        {activeTab === 'playlists' && !loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border hover:border-red-200 dark:hover:border-red-700 cursor-pointer transition-colors"
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{playlist.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{playlist.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{playlist.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                          {playlist.genre}
                        </span>
                        <span className="text-xs text-gray-500">
                          {playlist.trackCount} tracks • {playlist.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Playlist Tracks */}
            {selectedPlaylist && tracks.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-3">
                  🎵 {selectedPlaylist.name} - Tracks
                </h3>
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{track.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{track.artist}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{track.genre}</span>
                        <span className="text-sm text-gray-500">{track.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && !loading && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant="accent"
                size="sm"
                onClick={() => handleRecommendationTypeChange('debugging')}
              >
                🐛 Debugging
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => handleRecommendationTypeChange('learning')}
              >
                📚 Learning
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => handleRecommendationTypeChange('project')}
              >
                🚀 Project Work
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={() => handleRecommendationTypeChange('general')}
              >
                💻 General Coding
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {recommendations.map((track) => (
                <div key={track.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-green-50 dark:from-red-900/10 dark:to-green-900/10 rounded-lg border">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{track.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{track.artist}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded">
                      {track.mood}
                    </span>
                    <span className="text-sm text-gray-500">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Tab */}
        {activeTab === 'search' && !loading && searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Search Results for "{searchQuery}"
            </h3>
            {searchResults.map((track) => (
              <div key={track.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{track.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{track.artist}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                    {track.genre}
                  </span>
                  <span className="text-sm text-gray-500">{track.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty States */}
        {!loading && activeTab === 'search' && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">🎵</div>
            <p>No results found for "{searchQuery}"</p>
            <p className="text-sm">Try searching for "ambient", "electronic", or "focus"</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MusicDiscovery;