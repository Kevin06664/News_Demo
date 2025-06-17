import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Article } from '../types/types';
import { bookmarkService } from '../services/bookmarkService';
import NewsCard from '../components/NewsCard';

type BookmarksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Bookmarks'>;

const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation<BookmarksScreenNavigationProp>();
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookmarks = async () => {
    try {
      setLoading(true);
      const savedBookmarks = await bookmarkService.getBookmarks();
      setBookmarks(savedBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      Alert.alert('Error', 'Failed to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookmarks();
    setRefreshing(false);
  };

  const handleArticlePress = (article: Article) => {
    navigation.navigate('ArticleDetail', { article });
  };

  const handleBookmarkPress = async (article: Article) => {
    try {
      await bookmarkService.removeBookmark(article.url);
      setBookmarks(prev => prev.filter(item => item.url !== article.url));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      Alert.alert('Error', 'Failed to remove bookmark. Please try again.');
    }
  };

  // Reload bookmarks when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const renderArticle = ({ item }: { item: Article }) => (
    <NewsCard
      article={item}
      onPress={() => handleArticlePress(item)}
      onBookmarkPress={() => handleBookmarkPress(item)}
      isBookmarked={true}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Bookmarked Articles</Text>
        <Text style={styles.emptySubtitle}>
          Articles you bookmark will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  listContainer: {
    paddingVertical: 8,
  },
});

export default BookmarksScreen; 