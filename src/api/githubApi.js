/**
 * API service for GitHub integration
 */

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch user's public GitHub profile
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User profile data
 */
export const fetchGitHubProfile = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    const data = await response.json();
    return {
      username: data.login,
      name: data.name || data.login,
      avatar: data.avatar_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
      location: data.location,
      blog: data.blog,
      company: data.company
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};

/**
 * Fetch user's public repositories
 * @param {string} username - GitHub username
 * @param {number} limit - Number of repos to fetch
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchGitHubRepos = async (username, limit = 10) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const data = await response.json();
    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      htmlUrl: repo.html_url,
      topics: repo.topics || []
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

/**
 * Fetch user's contribution activity (simplified version using events)
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Contribution stats
 */
export const fetchGitHubActivity = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch activity');
    }
    const events = await response.json();
    
    // Process events to get activity stats
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentEvents = events.filter(event => 
      new Date(event.created_at) >= lastWeek
    );
    
    const pushEvents = recentEvents.filter(event => event.type === 'PushEvent');
    const totalCommits = pushEvents.reduce((sum, event) => 
      sum + (event.payload?.commits?.length || 0), 0
    );
    
    return {
      totalEvents: recentEvents.length,
      commits: totalCommits,
      repos: new Set(recentEvents.map(event => event.repo.name)).size,
      lastActivity: events[0]?.created_at || null
    };
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return {
      totalEvents: 0,
      commits: 0,
      repos: 0,
      lastActivity: null
    };
  }
};

/**
 * Search for trending repositories by language
 * @param {string} language - Programming language
 * @param {number} limit - Number of repos to fetch
 * @returns {Promise<Array>} Array of trending repositories
 */
export const fetchTrendingRepos = async (language = 'javascript', limit = 5) => {
  try {
    const query = `language:${language} stars:>100`;
    const response = await fetch(
      `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch trending repos');
    }
    const data = await response.json();
    return data.items.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      htmlUrl: repo.html_url,
      topics: repo.topics || []
    }));
  } catch (error) {
    console.error('Error fetching trending repos:', error);
    return [];
  }
};