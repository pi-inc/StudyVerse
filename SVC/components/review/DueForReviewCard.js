import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DueForReviewCard = ({ count }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Due for Review</Text>
        <Text style={styles.description}>
          {count} topics need your attention based on spaced repetition
        </Text>
      </View>
      
      <TouchableOpacity style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Review Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e32',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  reviewButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
});

export default DueForReviewCard;