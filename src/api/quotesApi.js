/**
 * API service for fetching inspirational quotes
 */

const QUOTABLE_API_BASE = 'https://api.quotable.io';

/**
 * Fetch a random inspirational quote
 * @returns {Promise<Object>} Quote object with content and author
 */
export const fetchRandomQuote = async () => {
  try {
    const response = await fetch(`${QUOTABLE_API_BASE}/random?tags=motivational|inspirational|success`);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return {
      content: data.content,
      author: data.author,
      tags: data.tags
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return {
      content: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      tags: ["motivational"]
    };
  }
};

/**
 * Fetch quotes by specific tag
 * @param {string} tag - Tag to filter quotes
 * @param {number} limit - Number of quotes to fetch
 * @returns {Promise<Array>} Array of quote objects
 */
export const fetchQuotesByTag = async (tag = 'motivational', limit = 5) => {
  try {
    const response = await fetch(`${QUOTABLE_API_BASE}/quotes?tags=${tag}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    const data = await response.json();
    return data.results.map(quote => ({
      id: quote._id,
      content: quote.content,
      author: quote.author,
      tags: quote.tags
    }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};

/**
 * Fetch author information
 * @param {string} authorSlug - Author slug identifier
 * @returns {Promise<Object>} Author information
 */
export const fetchAuthorInfo = async (authorSlug) => {
  try {
    const response = await fetch(`${QUOTABLE_API_BASE}/authors/${authorSlug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch author info');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching author info:', error);
    return null;
  }
};