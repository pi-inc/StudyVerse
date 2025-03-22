# API Documentation (GraphQL)

## 1. Overview

This document outlines the GraphQL API for the StudyVerse app.

## 2. General Conventions

*   **Endpoint:** `/graphql`
*   **Request Method:** POST
*   **Request Body:** JSON object containing the GraphQL query or mutation.
*   **Response Body:** JSON object containing the results of the query or mutation, as well as any errors that occurred.
*   **Error Handling:**
    *   Appropriate HTTP status codes will be returned to indicate the type of error that occurred.
    *   Error responses will be formatted as JSON objects with the following properties:
        *   `code`: A unique error code (e.g., `USER_NOT_FOUND`, `INVALID_PASSWORD`).
        *   `message`: A human-readable error message (e.g., "User not found", "Invalid password").
        *   `details`: (Optional) Additional details about the error (e.g., validation errors, stack traces).

## 3. Queries

### 3.1. Users

*   `getUser(id: ID!): User`: Get a specific user by ID.
    *   *Arguments:*
        *   `id`: (ID!, required) The ID of the user to retrieve.
    *   *Returns:*
        *   `User`: The user object, or null if the user is not found.
*   `getUsers(filter: UserFilter, limit: Int, offset: Int): [User]`: Get a list of users with optional filtering and pagination.
    *   *Arguments:*
        *   `filter`: (UserFilter, optional) A filter to apply to the list of users.
        *   `limit`: (Int, optional) The maximum number of users to return.
        *   `offset`: (Int, optional) The offset to start from.
    *   *Returns:*
        *   `[User]`: A list of user objects.

### 3.2. Courses

*   `getCourse(id: ID!): Course`: Get a specific course by ID.
*   `getCourses(filter: CourseFilter, limit: Int, offset: Int): [Course]`: Get a list of courses with optional filtering and pagination.

### 3.3. Lessons

*   `getLesson(id: ID!): Lesson`: Get a specific lesson by ID.
*   `getLessons(courseId: ID!, filter: LessonFilter, limit: Int, offset: Int): [Lesson]`: Get a list of lessons for a specific course with optional filtering and pagination.

### 3.4. Quizzes

*   `getQuiz(id: ID!): Quiz`: Get a specific quiz by ID.
*   `getQuizzes(lessonId: ID!, filter: QuizFilter, limit: Int, offset: Int): [Quiz]`: Get a list of quizzes for a specific lesson with optional filtering and pagination.

### 3.5. UserProgress

*   `getUserProgress(userId: ID!): UserProgress`: Get a user's progress.

### 3.6. Achievements

*   `getAchievement(id: ID!): Achievement`: Get a specific achievement by ID.
*   `getAchievements(filter: AchievementFilter, limit: Int, offset: Int): [Achievement]`: Get a list of achievements with optional filtering and pagination.

### 3.7. UserAchievements

*   `getUserAchievement(userId: ID!, achievementId: ID!): UserAchievement`: Get a specific user achievement.
*   `getUserAchievements(userId: ID!, filter: UserAchievementFilter, limit: Int, offset: Int): [UserAchievement]`: Get a list of user achievements with optional filtering and pagination.

### 3.8. StudyGroups

*   `getStudyGroup(id: ID!): StudyGroup`: Get a specific study group by ID.
*   `getStudyGroups(filter: StudyGroupFilter, limit: Int, offset: Int): [StudyGroup]`: Get a list of study groups with optional filtering and pagination.

### 3.9. Notifications

*   `getNotification(id: ID!): Notification`: Get a specific notification by ID.
*   `getNotifications(userId: ID!, filter: NotificationFilter, limit: Int, offset: Int): [Notification]`: Get a list of notifications for a specific user with optional filtering and pagination.

## 4. Mutations

### 4.1. Users

*   `createUser(input: CreateUserInput!): User`: Create a new user.
*   `updateUser(id: ID!, input: UpdateUserInput!): User`: Update an existing user.
*   `deleteUser(id: ID!): Boolean`: Delete a user.

### 4.2. Courses

*   `createCourse(input: CreateCourseInput!): Course`: Create a new course.
*   `updateCourse(id: ID!, input: UpdateCourseInput!): Course`: Update an existing course.
*   `deleteCourse(id: ID!): Boolean`: Delete a course.

### 4.3. Lessons

*   `createLesson(input: CreateLessonInput!): Lesson`: Create a new lesson.
*   `updateLesson(id: ID!, input: UpdateLessonInput!): Lesson`: Update an existing lesson.
*   `deleteLesson(id: ID!): Boolean`: Delete a lesson.

### 4.4. Quizzes

*   `createQuiz(input: CreateQuizInput!): Quiz`: Create a new quiz.
*   `updateQuiz(id: ID!, input: UpdateQuizInput!): Quiz`: Update an existing quiz.
*   `deleteQuiz(id: ID!): Boolean`: Delete a quiz.

### 4.5. UserProgress

*   `updateUserProgress(userId: ID!, input: UpdateUserProgressInput!): UserProgress`: Update a user's progress.

### 4.6. Achievements

*   `createAchievement(input: CreateAchievementInput!): Achievement`: Create a new achievement.
*   `updateAchievement(id: ID!, input: UpdateAchievementInput!): Achievement`: Update an existing achievement.

### 4.7. UserAchievements

*   `createUserAchievement(userId: ID!, achievementId: ID!): UserAchievement`: Create a new user achievement (assign an achievement to a user).

### 4.8. StudyGroups

*   `createStudyGroup(input: CreateStudyGroupInput!): StudyGroup`: Create a new study group.
*   `updateStudyGroup(id: ID!, input: UpdateStudyGroupInput!): StudyGroup`: Update an existing study group.

### 4.9. Notifications

*   `createNotification(input: CreateNotificationInput!): Notification`: Create a new notification.
*   `updateNotification(id: ID!, input: UpdateNotificationInput!): Notification`: Update an existing notification (e.g., mark as read).

## 5. Rate Limiting

*   The API will implement rate limiting to prevent abuse.
*   Users will be limited to a certain number of requests per minute.
*   If a user exceeds the rate limit, they will receive a `429 Too Many Requests` error.

## 6. Authentication and Authorization

*   All API requests will require authentication.
*   Authentication will be handled using Firebase Authentication.
*   Role-based access control will be used to restrict access to sensitive resources based on the user's role.

