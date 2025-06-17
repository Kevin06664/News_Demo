import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, Article } from '../types/types';
import { bookmarkService } from '../services/bookmarkService';

type ArticleDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

const ArticleDetailScreen: React.FC = () => {
  const route = useRoute<ArticleDetailRouteProp>();
  const { article } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarked = await bookmarkService.isBookmarked(article.url);
      setIsBookmarked(bookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      setLoading(true);
      if (isBookmarked) {
        await bookmarkService.removeBookmark(article.url);
        setIsBookmarked(false);
      } else {
        await bookmarkService.addBookmark(article);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('Error', 'Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      {article.urlToImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Title with Bookmark Icon */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <TouchableOpacity
            style={styles.bookmarkIconContainer}
            onPress={handleBookmarkToggle}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Icon
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={28}
                color={isBookmarked ? '#007AFF' : '#666'}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Meta Information */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Icon name="newspaper-outline" size={16} color="#007AFF" />
            <Text style={styles.source}>{article.source.name}</Text>
          </View>
          
          {article.author && (
            <View style={styles.metaRow}>
              <Icon name="person-outline" size={16} color="#666" />
              <Text style={styles.author}>{article.author}</Text>
            </View>
          )}
          
          <View style={styles.metaRow}>
            <Icon name="time-outline" size={16} color="#666" />
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
        </View>

        {/* Description */}
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}

        {/* Content */}
        {article.content && (
          <Text style={styles.contentText}>
            {article.content.replace(/\[\+\d+ chars\]$/, '')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  content: {
    backgroundColor: 'white',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 32,
    flex: 1,
    marginRight: 16,
  },
  bookmarkIconContainer: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  metaContainer: {
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26,
    marginBottom: 30,
  },
});

export default ArticleDetailScreen; 