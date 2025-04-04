import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flashcard from './Flashcard';

const { width } = Dimensions.get('window');

const FlashcardView = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const currentCard = flashcards[currentCardIndex];
  
  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  
  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardCountContainer}>
          <Text style={styles.cardCountText}>
            Card {currentCardIndex + 1} of {flashcards.length}
          </Text>
        </View>
        
        <View style={[styles.difficultyContainer, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Text style={[styles.difficultyText, { color: '#10b981' }]}>
            {currentCard.difficulty}
          </Text>
        </View>
        
        <View style={styles.dueDateContainer}>
          <Ionicons name="calendar" size={16} color="#f59e0b" />
          <Text style={styles.dueDateText}>{currentCard.dueDate}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <Flashcard 
        question={currentCard.question} 
        answer={currentCard.answer}
        onSwipeLeft={goToNextCard}
        onSwipeRight={goToPrevCard}
      />
      
      <View style={styles.reviewInfoContainer}>
        <Text style={styles.reviewInfoText}>Last reviewed: 5 days ago</Text>
        <Text style={styles.reviewInfoText}>Next review: Today</Text>
      </View>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={goToPrevCard}
          disabled={currentCardIndex === 0}
        >
          <Ionicons 
            name="chevron-back" 
            size={20} 
            color={currentCardIndex === 0 ? '#6b7280' : '#fff'} 
          />
          <Text 
            style={[
              styles.navigationButtonText,
              currentCardIndex === 0 && styles.disabledButtonText
            ]}
          >
            Prev
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navigationButton} onPress={goToNextCard}>
          <Text style={styles.navigationButtonText}>Skip</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardCountContainer: {
    backgroundColor: '#2d2d44',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  cardCountText: {
    fontSize: 14,
    color: '#a78bfa',
    fontWeight: 'bold',
  },
  difficultyContainer: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dueDateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#2d2d44',
    marginBottom: 16,
  },
  reviewInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2d2d44',
    marginTop: 16,
    marginBottom: 16,
  },
  reviewInfoText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 8,
  },
  disabledButtonText: {
    color: '#6b7280',
  },
});

export default FlashcardView;