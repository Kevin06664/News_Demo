import axios from 'axios';
import { NewsResponse } from '../types/types';
import { API_CONFIG } from '../config/api';

export const newsService = {
  async getTopHeadlines(country: string = API_CONFIG.DEFAULT_COUNTRY): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${API_CONFIG.NEWS_BASE_URL}/top-headlines`, {
        params: {
          country,
          apiKey: API_CONFIG.NEWS_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  async searchNews(query: string): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${API_CONFIG.NEWS_BASE_URL}/everything`, {
        params: {
          q: query,
          sortBy: 'publishedAt',
          apiKey: API_CONFIG.NEWS_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },
}; 