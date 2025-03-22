# StudyVerse: Unlock Your Potential, One Fun Lesson at a Time.

## 1. Introduction

StudyVerse is an AI-powered educational app designed to make studying fun, interactive, and effective for university students. It leverages gamification, personalized learning, and social features to create an engaging learning experience.

## 2. Features

*   **Tutor (AI-Powered Personalized Learning):**
    *   AI-driven content delivery.
    *   Personalized teaching styles.
    *   Adaptive learning based on user performance.
    *   Interactive lessons.
    *   Visual aids.
*   **Courses (Curriculum & Content Management):**
    *   Pre-built courses for common university subjects.
    *   AI-powered custom course creation.
    *   Curriculum breakdown into smaller topics.
*   **Reviser (Review & Reinforcement):**
    *   Varied revision methods (quizzes, flashcards, summaries).
    *   Spaced repetition algorithm.
    *   Progress tracking.
*   **Planner (Timetable & Reminders):**
    *   Automated timetable generation.
    *   Customizable schedule.
    *   Reminders and notifications.
*   **Social Features (Community & Motivation):**
    *   Study groups.
    *   Challenges.
    *   Sharing progress on social media.
*   **Gamification (Motivation & Engagement):**
    *   Streaks for consistent learning.
    *   Achievements for completing milestones.
    *   Rewards and badges for progress.

## 3. Technologies Used

*   **Frontend:**
    *   React Native (with React Native Web)
    *   Ant Design Mobile RN
    *   React Navigation
    *   Tailwind CSS
*   **Backend:**
    *   Node.js with Express.js
    *   Firebase Firestore
    *   GraphQL
    *   Firebase Authentication
*   **AI:**
    *   Google Gemini API
*   **DevOps:**
    *   Firebase Hosting
    *   Firebase Cloud Functions
    *   GitHub Actions
    *   Firebase Performance Monitoring

## 4. Setup Instructions

1.  Clone the repository: `git clone <repository-url>`
2.  Install dependencies: `npm install`
3.  Configure Firebase:
    *   Create a Firebase project in the Firebase Console.
    *   Enable Firebase Authentication, Firestore, and Cloud Functions.
    *   Download the Firebase configuration file (`firebase.json`) and place it in the project root.
4.  Set up environment variables:
    *   Create a `.env` file in the project root.
    *   Add the following environment variables:
        *   `FIREBASE_API_KEY=<your-firebase-api-key>`
        *   `FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>`
        *   `FIREBASE_PROJECT_ID=<your-firebase-project-id>`
        *   `FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>`
        *   `FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>`
        *   `FIREBASE_APP_ID=<your-firebase-app-id>`
5.  Run the app: `npm start`

## 5. API Documentation

*   The API is documented using GraphQL Playground.
*   To access the API documentation, run the backend and navigate to `/graphql` in your browser.

## 6. Contributing

We welcome contributions to StudyVerse! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write tests for your changes.
5.  Submit a pull request.

## 7. License

(To be added)