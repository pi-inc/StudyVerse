/**
 * Mock course data service
 */

// Course data
export const courses = {
  "ml-intro": {
    id: "ml-intro",
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning including supervised and unsupervised learning, model evaluation, and practical applications.",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: "1,289",
    rating: "4.8",
    progress: 35,
    isFavorite: false,
    lastAccessed: "2 days ago",
    timeSpent: "4 hours 23 minutes",
    completedItems: "8",
    totalItems: "19",
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Machine Learning Professor",
    },
    modules: [
      {
        id: "ml-intro-1",
        title: "Introduction to Machine Learning Concepts",
        description: "Overview of key machine learning paradigms and applications",
        duration: "45 minutes",
        completed: true,
      },
      {
        id: "ml-intro-2",
        title: "Supervised Learning Algorithms",
        description: "Dive into classification and regression techniques",
        duration: "1 hour 30 minutes",
        completed: true,
      },
      {
        id: "ml-intro-3",
        title: "Unsupervised Learning",
        description: "Clustering and dimensionality reduction",
        duration: "1 hour 15 minutes",
        completed: false,
      },
      {
        id: "ml-intro-4",
        title: "Model Evaluation and Validation",
        description: "Techniques to assess model performance and prevent overfitting",
        duration: "1 hour",
        completed: false,
      },
      {
        id: "ml-intro-5",
        title: "Final Project",
        description: "Apply your knowledge to a real-world machine learning problem",
        duration: "3 hours",
        completed: false,
      },
    ],
    learningOutcomes: [
      "Understand core machine learning concepts",
      "Implement supervised learning algorithms",
      "Apply clustering and dimensionality reduction",
      "Evaluate and validate machine learning models",
      "Build a complete machine learning project",
    ],
  },
  "data-science": {
    id: "data-science",
    title: "Data Science Fundamentals",
    description:
      "Master the essential skills of data science including data cleaning, visualization, statistical analysis, and predictive modeling.",
    level: "Beginner",
    duration: "10 weeks",
    enrolled: "2,456",
    rating: "4.7",
    progress: 15,
    isFavorite: true,
    lastAccessed: "5 days ago",
    timeSpent: "2 hours 45 minutes",
    completedItems: "3",
    totalItems: "22",
    instructor: {
      name: "Dr. Michael Chen",
      title: "Data Science Director",
    },
    modules: [
      {
        id: "data-science-1",
        title: "Introduction to Data Science",
        description: "Overview of the data science field and its applications",
        duration: "50 minutes",
        completed: true,
      },
      {
        id: "data-science-2",
        title: "Data Collection and Cleaning",
        description: "Techniques for gathering and preprocessing data",
        duration: "1 hour 45 minutes",
        completed: true,
      },
      {
        id: "data-science-3",
        title: "Exploratory Data Analysis",
        description: "Visualizing and understanding data patterns",
        duration: "2 hours",
        completed: true,
      },
      {
        id: "data-science-4",
        title: "Statistical Analysis",
        description: "Applying statistical methods to extract insights",
        duration: "2 hours 30 minutes",
        completed: false,
      },
      {
        id: "data-science-5",
        title: "Predictive Modeling",
        description: "Building models to forecast future trends",
        duration: "3 hours",
        completed: false,
      },
      {
        id: "data-science-6",
        title: "Capstone Project",
        description: "End-to-end data science project",
        duration: "4 hours",
        completed: false,
      },
    ],
    learningOutcomes: [
      "Collect and clean real-world datasets",
      "Create compelling data visualizations",
      "Apply statistical methods to analyze data",
      "Build predictive models",
      "Communicate data insights effectively",
      "Complete an end-to-end data science project",
    ],
  },
  "web-dev": {
    id: "web-dev",
    title: "Modern Web Development",
    description:
      "Learn to build responsive, interactive web applications using modern JavaScript frameworks and best practices.",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: "3,782",
    rating: "4.9",
    progress: 65,
    isFavorite: false,
    lastAccessed: "Yesterday",
    timeSpent: "18 hours 15 minutes",
    completedItems: "14",
    totalItems: "24",
    instructor: {
      name: "Emma Rodriguez",
      title: "Senior Frontend Engineer",
    },
    modules: [
      {
        id: "web-dev-1",
        title: "Modern JavaScript Fundamentals",
        description: "ES6+ features and advanced concepts",
        duration: "2 hours",
        completed: true,
      },
      {
        id: "web-dev-2",
        title: "React Fundamentals",
        description: "Components, props, state, and hooks",
        duration: "3 hours",
        completed: true,
      },
      {
        id: "web-dev-3",
        title: "State Management",
        description: "Context API, Redux, and other state solutions",
        duration: "2 hours 30 minutes",
        completed: true,
      },
      {
        id: "web-dev-4",
        title: "Routing and Navigation",
        description: "Building multi-page applications",
        duration: "1 hour 45 minutes",
        completed: true,
      },
      {
        id: "web-dev-5",
        title: "API Integration",
        description: "Fetching and managing data from backends",
        duration: "2 hours 15 minutes",
        completed: false,
      },
      {
        id: "web-dev-6",
        title: "Testing and Deployment",
        description: "Unit testing, CI/CD, and hosting options",
        duration: "2 hours",
        completed: false,
      },
      {
        id: "web-dev-7",
        title: "Final Project",
        description: "Build a complete web application",
        duration: "5 hours",
        completed: false,
      },
    ],
    learningOutcomes: [
      "Write clean, modern JavaScript code",
      "Build component-based UIs with React",
      "Implement effective state management",
      "Create multi-page applications with routing",
      "Integrate with backend APIs",
      "Test and deploy web applications",
      "Develop a portfolio-ready web project",
    ],
  },
  algorithms: {
    id: "algorithms",
    title: "Algorithms and Data Structures",
    description:
      "Master fundamental algorithms and data structures essential for efficient problem-solving and technical interviews.",
    level: "Advanced",
    duration: "8 weeks",
    enrolled: "1,845",
    rating: "4.8",
    progress: 25,
    isFavorite: false,
    lastAccessed: "3 days ago",
    timeSpent: "6 hours 40 minutes",
    completedItems: "5",
    totalItems: "20",
    instructor: {
      name: "Prof. Alex Kumar",
      title: "Computer Science Professor",
    },
    modules: [
      {
        id: "algorithms-1",
        title: "Introduction to Algorithms",
        description: "Big O notation and algorithm analysis",
        duration: "1 hour 15 minutes",
        completed: true,
      },
      {
        id: "algorithms-2",
        title: "Arrays and Strings",
        description: "Common array and string manipulation techniques",
        duration: "2 hours",
        completed: true,
      },
      {
        id: "algorithms-3",
        title: "Linked Lists",
        description: "Implementation and common operations",
        duration: "1 hour 30 minutes",
        completed: true,
      },
      {
        id: "algorithms-4",
        title: "Stacks and Queues",
        description: "LIFO and FIFO data structures",
        duration: "1 hour 45 minutes",
        completed: true,
      },
      {
        id: "algorithms-5",
        title: "Trees and Graphs",
        description: "Hierarchical and network data structures",
        duration: "3 hours",
        completed: true,
      },
      {
        id: "algorithms-6",
        title: "Sorting and Searching",
        description: "Efficient algorithms for ordering and finding data",
        duration: "2 hours 30 minutes",
        completed: false,
      },
      {
        id: "algorithms-7",
        title: "Dynamic Programming",
        description: "Optimization technique for complex problems",
        duration: "3 hours",
        completed: false,
      },
      {
        id: "algorithms-8",
        title: "Advanced Topics",
        description: "Greedy algorithms, backtracking, and more",
        duration: "2 hours 45 minutes",
        completed: false,
      },
    ],
    learningOutcomes: [
      "Analyze algorithm efficiency using Big O notation",
      "Implement fundamental data structures",
      "Apply appropriate algorithms to solve problems",
      "Optimize solutions for time and space complexity",
      "Solve common technical interview questions",
      "Develop algorithmic thinking skills",
    ],
  },
}

// Get course by ID
export const getCourseById = (courseId) => {
  if (!courseId) {
    console.error("No courseId provided")
    return null
  }

  // Convert numeric IDs to string if needed
  const courseIdStr = String(courseId)

  // Check if course exists
  if (!courses[courseIdStr]) {
    console.error("Course not found with ID:", courseIdStr)
    return null
  }

  return courses[courseIdStr]
}

// Get module by ID
export const getModuleById = (courseId, moduleId) => {
  const course = getCourseById(courseId)

  if (!course) {
    return null
  }

  return course.modules.find((module) => module.id === moduleId) || null
}

// Get recommended courses
export const getRecommendedCourses = () => {
  console.log("getRecommendedCourses called")
  const result = [
    {
      id: 1,
      title: "Web Development",
      type: "Course",
      description: "Based on your interests",
      iconBgColor: "#7c3aed",
      icon: "book-outline",
      courseId: "web-dev",
    },
    {
      id: 2,
      title: "Algorithms and Data Structures",
      type: "Course",
      description: "Popular in your field",
      iconBgColor: "#3b82f6",
      icon: "git-branch",
      courseId: "algorithms",
    },
    {
      id: 3,
      title: "Need help with a concept?",
      type: "AI Tutor",
      description: "Ask the AI Tutor",
      iconBgColor: "#10b981",
      icon: "bulb-outline",
    },
  ]
  console.log("getRecommendedCourses returning:", result)
  return result
}

// Get continue learning courses
export const getContinueLearningCourses = () => {
  console.log("getContinueLearningCourses called")
  const result = [
    {
      id: "ml-intro",
      title: "Introduction to Machine Learning",
      description: "Learn the basics of machine learning and AI concepts",
      progress: 35,
      progressColor: "#a78bfa",
      category: "Computer Science",
      level: "Intermediate",
      rating: 4.8,
      icon: "💻",
      lastAccessed: "2 days ago",
    },
    {
      id: "data-science",
      title: "Data Science Fundamentals",
      description: "Master essential data science skills and techniques",
      progress: 15,
      progressColor: "#3b82f6",
      category: "Data Science",
      level: "Beginner",
      rating: 4.7,
      icon: "📊",
      lastAccessed: "5 days ago",
    },
  ]
  console.log("getContinueLearningCourses returning:", result)
  return result
}

// Get explore courses
export const getExploreCourses = () => {
  console.log("getExploreCourses called")
  const result = [
    {
      id: "web-dev",
      title: "Modern Web Development",
      description: "Learn to build responsive, interactive web applications",
      category: "Web Development",
      level: "Intermediate",
      rating: 4.9,
      icon: "🌐",
    },
    {
      id: "algorithms",
      title: "Algorithms and Data Structures",
      description: "Master fundamental algorithms for efficient problem-solving",
      category: "Computer Science",
      level: "Advanced",
      rating: 4.8,
      icon: "🧮",
    },
  ]
  console.log("getExploreCourses returning:", result)
  return result
}

