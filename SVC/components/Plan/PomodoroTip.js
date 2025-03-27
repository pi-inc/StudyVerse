import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PomodoroTip = () => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="time-outline" size={20} color="#f59e0b" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Pomodoro Technique</Text>
        <Text style={styles.description}>
          Try studying in 25-minute focused sessions with 5-minute breaks in between.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
});

export default PomodoroTip;