/**
 * API service for music discovery using JSONPlaceholder and sample data
 * Note: For a real implementation, you would integrate with Spotify Web API or Last.fm
 */

// Sample coding music data (in a real app, this would come from Spotify/Last.fm)
const SAMPLE_PLAYLISTS = [
  {
    id: 1,
    name: "Deep Focus",
    description: "Concentration music for coding sessions",
    trackCount: 45,
    duration: "3h 12m",
    image: "🎧",
    genre: "Ambient"
  },
  {
    id: 2,
    name: "Coding Beats",
    description: "Upbeat instrumental tracks to keep you motivated",
    trackCount: 32,
    duration: "2h 18m",
    image: "🎵",
    genre: "Electronic"
  },
  {
    id: 3,
    name: "Lo-Fi Study",
    description: "Chill lo-fi beats for relaxed coding",
    trackCount: 28,
    duration: "1h 54m",
    image: "🎼",
    genre: "Lo-Fi"
  },
  {
    id: 4,
    name: "Classical Focus",
    description: "Classical music for deep concentration",
    trackCount: 25,
    duration: "2h 45m",
    image: "🎻",
    genre: "Classical"
  },
  {
    id: 5,
    name: "Synthwave Programming",
    description: "Retro synthwave for late-night coding",
    trackCount: 20,
    duration: "1h 32m",
    image: "🌆",
    genre: "Synthwave"
  }
];

const SAMPLE_TRACKS = [
  {
    id: 1,
    title: "Midnight Coding",
    artist: "Code Symphony",
    duration: "4:23",
    genre: "Ambient",
    mood: "focused"
  },
  {
    id: 2,
    title: "Binary Dreams",
    artist: "Digital Zen",
    duration: "3:45",
    genre: "Electronic",
    mood: "energetic"
  },
  {
    id: 3,
    title: "Algorithm Flow",
    artist: "Function Beat",
    duration: "5:12",
    genre: "Lo-Fi",
    mood: "relaxed"
  },
  {
    id: 4,
    title: "Debug Sessions",
    artist: "Syntax Sound",
    duration: "3:28",
    genre: "Ambient",
    mood: "concentrated"
  },
  {
    id: 5,
    title: "Compile Time",
    artist: "Runtime Rhythm",
    duration: "4:01",
    genre: "Electronic",
    mood: "motivated"
  }
];

/**
 * Fetch coding playlists
 * @returns {Promise<Array>} Array of playlist objects
 */
export const fetchCodingPlaylists = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return SAMPLE_PLAYLISTS;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

/**
 * Fetch tracks from a playlist
 * @param {number} playlistId - Playlist ID
 * @returns {Promise<Array>} Array of track objects
 */
export const fetchPlaylistTracks = async (playlistId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // Return sample tracks (in real app, would filter by playlist)
    return SAMPLE_TRACKS;
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return [];
  }
};

/**
 * Search for music by mood or genre
 * @param {string} query - Search query (mood or genre)
 * @returns {Promise<Array>} Array of matching tracks
 */
export const searchMusic = async (query) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Filter tracks based on query
    const filtered = SAMPLE_TRACKS.filter(track =>
      track.genre.toLowerCase().includes(query.toLowerCase()) ||
      track.mood.toLowerCase().includes(query.toLowerCase()) ||
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered;
  } catch (error) {
    console.error('Error searching music:', error);
    return [];
  }
};

/**
 * Get music recommendations based on coding activity
 * @param {string} codingActivity - Type of coding activity
 * @returns {Promise<Array>} Array of recommended tracks
 */
export const getMusicRecommendations = async (codingActivity = 'general') => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let mood;
    switch (codingActivity) {
      case 'debugging':
        mood = 'focused';
        break;
      case 'learning':
        mood = 'relaxed';
        break;
      case 'project':
        mood = 'energetic';
        break;
      default:
        mood = 'concentrated';
    }
    
    return SAMPLE_TRACKS.filter(track => track.mood === mood);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};

/**
 * Get user's listening stats (mock data)
 * @returns {Promise<Object>} Listening statistics
 */
export const getListeningStats = async () => {
  try {
    // Check if user has any saved music listening data
    const savedStats = localStorage.getItem('devjourney-music-stats');
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    
    // Default stats for new users
    return {
      totalHours: 0,
      favoriteGenre: '–',
      topArtist: '–',
      mostPlayedTrack: '–',
      codingPlaytime: '0h 0m',
      playlists: 0
    };
  } catch (error) {
    console.error('Error fetching listening stats:', error);
    return {
      totalHours: 0,
      favoriteGenre: '–',
      topArtist: '–',
      mostPlayedTrack: '–',
      codingPlaytime: '0h 0m',
      playlists: 0
    };
  }
};

/**
 * Track music listening activity
 * @param {Object} activity - Music activity data
 */
export const trackMusicActivity = async (activity) => {
  try {
    // Get current stats
    const currentStats = await getListeningStats();
    
    // Update stats based on activity
    const updatedStats = {
      ...currentStats,
      totalHours: currentStats.totalHours + (activity.duration || 0),
      codingPlaytime: `${Math.floor(currentStats.totalHours + (activity.duration || 0))}h ${Math.floor(((currentStats.totalHours + (activity.duration || 0)) % 1) * 60)}m`,
      playlists: currentStats.playlists + (activity.type === 'playlist_added' ? 1 : 0),
      ...(activity.genre && { favoriteGenre: activity.genre }),
      ...(activity.artist && { topArtist: activity.artist }),
      ...(activity.track && { mostPlayedTrack: activity.track })
    };
    
    // Save updated stats
    localStorage.setItem('devjourney-music-stats', JSON.stringify(updatedStats));
    
    // Also save to activity log
    const musicActivities = JSON.parse(localStorage.getItem('devjourney-music-activities') || '[]');
    musicActivities.push({
      id: Date.now(),
      ...activity,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('devjourney-music-activities', JSON.stringify(musicActivities));
    
    return updatedStats;
  } catch (error) {
    console.error('Error tracking music activity:', error);
    return null;
  }
};