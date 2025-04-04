"use client"

import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/shared/Header"
import AnimatedListItem from "../components/shared/AnimatedListItem"

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="About StudyVerse" showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <AnimatedListItem index={0}>
            <View style={styles.logoContainer}>
              <Ionicons name="book" size={60} color="#7c3aed" />
              <Text style={styles.appName}>StudyVerse</Text>
              <Text style={styles.version}>Version 1.0.0</Text>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={1}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About the App</Text>
              <Text style={styles.sectionText}>
                StudyVerse is an AI-powered learning platform designed to help students master complex subjects through
                personalized learning paths, interactive study tools, and spaced repetition techniques.
              </Text>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={2}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              <View style={styles.featureItem}>
                <Ionicons name="book-outline" size={24} color="#7c3aed" style={styles.featureIcon} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Personalized Learning</Text>
                  <Text style={styles.featureText}>
                    AI-powered learning paths tailored to your knowledge level and goals.
                  </Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="refresh-outline" size={24} color="#7c3aed" style={styles.featureIcon} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Spaced Repetition</Text>
                  <Text style={styles.featureText}>
                    Scientifically-proven review schedules to maximize long-term retention.
                  </Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people-outline" size={24} color="#7c3aed" style={styles.featureIcon} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Community Learning</Text>
                  <Text style={styles.featureText}>
                    Connect with peers studying similar subjects for collaborative learning.
                  </Text>
                </View>
              </View>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={3}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Us</Text>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="mail-outline" size={24} color="#7c3aed" style={styles.contactIcon} />
                <Text style={styles.contactText}>support@studyverse.com</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="globe-outline" size={24} color="#7c3aed" style={styles.contactIcon} />
                <Text style={styles.contactText}>www.studyverse.com</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactItem}>
                <Ionicons name="logo-twitter" size={24} color="#7c3aed" style={styles.contactIcon} />
                <Text style={styles.contactText}>@StudyVerse</Text>
              </TouchableOpacity>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={4}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Legal</Text>
              <TouchableOpacity style={styles.legalItem}>
                <Text style={styles.legalText}>Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.legalItem}>
                <Text style={styles.legalText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.legalItem}>
                <Text style={styles.legalText}>Data Usage</Text>
              </TouchableOpacity>
            </View>
          </AnimatedListItem>

          <AnimatedListItem index={5}>
            <View style={styles.footer}>
              <Text style={styles.copyright}>© 2025 StudyVerse Inc. All rights reserved.</Text>
            </View>
          </AnimatedListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a1a",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#a78bfa",
    marginTop: 12,
  },
  version: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    color: "#d1d5db",
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2d2d44",
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: "#d1d5db",
  },
  legalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2d2d44",
  },
  legalText: {
    fontSize: 16,
    color: "#d1d5db",
  },
  footer: {
    alignItems: "center",
    marginVertical: 24,
  },
  copyright: {
    fontSize: 14,
    color: "#6b7280",
  },
})

export default AboutScreen

