import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/types';

const BOOKMARKS_KEY = '@news_bookmarks';

export const bookmarkService = {
  async getBookmarks(): Promise<Article[]> {
    try {
      const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
      return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  },

  async addBookmark(article: Article): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const articleWithBookmark = { ...article, isBookmarked: true };
      
      // Check if article already exists
      const existingIndex = bookmarks.findIndex(
        bookmark => bookmark.url === article.url
      );
      
      if (existingIndex === -1) {
        bookmarks.push(articleWithBookmark);
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  },

  async removeBookmark(articleUrl: string): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const filteredBookmarks = bookmarks.filter(
        bookmark => bookmark.url !== articleUrl
      );
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filteredBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  },

  async isBookmarked(articleUrl: string): Promise<boolean> {
    try {
      const bookmarks = await this.getBookmarks();
      return bookmarks.some(bookmark => bookmark.url === articleUrl);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  },
}; 