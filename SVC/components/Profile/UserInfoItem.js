import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileHeader = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#fff" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userTitle}>{user.title}</Text>
      
      <View style={styles.badgesContainer}>
        <View style={styles.levelBadge}>
          <Text style={styles.badgeText}>Level {user.level}</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.badgeText}>{user.points} Points</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
  },
  editButton: {
    position: 'absolute',
    right: -20,
    top: 10,
    backgroundColor: 'rgba(30, 30, 50, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  editText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
  },
  levelBadge: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  pointsBadge: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProfileHeader;