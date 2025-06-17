import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Article } from '../types/types';
import { newsService } from '../services/newsService';
import { bookmarkService } from '../services/bookmarkService';
import NewsCard from '../components/NewsCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsService.getTopHeadlines();
      const articlesWithBookmarks = await Promise.all(
        response.articles.map(async (article) => {
          const isBookmarked = await bookmarkService.isBookmarked(article.url);
          return { ...article, isBookmarked };
        })
      );
      setArticles(articlesWithBookmarks);
      
      // Update bookmarked URLs set
      const bookmarkedSet = new Set<string>();
      articlesWithBookmarks.forEach(article => {
        if (article.isBookmarked) {
          bookmarkedSet.add(article.url);
        }
      });
      setBookmarkedUrls(bookmarkedSet);
    } catch (error: any) {
      console.error('Error fetching news:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to fetch news articles. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          errorMessage = 'API key is invalid. Please check your API configuration.';
        } else if (error.response.status === 429) {
          errorMessage = 'API rate limit exceeded. Please try again later.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        // Other error
        errorMessage = `Error: ${error.message}`;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  const handleBookmarkPress = async (article: Article) => {
    try {
      if (bookmarkedUrls.has(article.url)) {
        await bookmarkService.removeBookmark(article.url);
        setBookmarkedUrls(prev => {
          const newSet = new Set(prev);
          newSet.delete(article.url);
          return newSet;
        });
        setArticles(prev =>
          prev.map(item =>
            item.url === article.url ? { ...item, isBookmarked: false } : item
          )
        );
      } else {
        await bookmarkService.addBookmark(article);
        setBookmarkedUrls(prev => new Set(prev).add(article.url));
        setArticles(prev =>
          prev.map(item =>
            item.url === article.url ? { ...item, isBookmarked: true } : item
          )
        );
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('Error', 'Failed to update bookmark. Please try again.');
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderArticle = ({ item }: { item: Article }) => (
    <NewsCard
      article={item}
      onPress={() => handleArticlePress(item)}
      onBookmarkPress={() => handleBookmarkPress(item)}
      isBookmarked={bookmarkedUrls.has(item.url)}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.url}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingVertical: 8,
  },
});

export default HomeScreen; 