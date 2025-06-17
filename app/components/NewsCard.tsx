import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Article } from '../types/types';

interface NewsCardProps {
  article: Article;
  onPress: () => void;
  onBookmarkPress: () => void;
  isBookmarked: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onPress,
  onBookmarkPress,
  isBookmarked,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="newspaper-outline" size={40} color="#ccc" />
          </View>
        )}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={onBookmarkPress}
        >
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#007AFF' : '#666'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        
        {article.description && (
          <Text style={styles.description} numberOfLines={3}>
            {article.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default NewsCard; 