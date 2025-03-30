/**
 * Utility functions for navigation
 */

/**
 * Navigate to a course detail screen
 * @param {object} navigation - The navigation object
 * @param {string} courseId - The ID of the course to navigate to
 */
export const navigateToCourse = (navigation, courseId) => {
    if (!courseId) {
      console.error("No courseId provided for navigation")
      return
    }
  
    console.log("Navigating to course:", courseId)
    navigation.navigate("CourseDetail", { courseId })
  }
  
  /**
   * Navigate to a module detail screen
   * @param {object} navigation - The navigation object
   * @param {string} courseId - The ID of the course
   * @param {string} moduleId - The ID of the module to navigate to
   */
  export const navigateToModule = (navigation, courseId, moduleId) => {
    if (!courseId || !moduleId) {
      console.error("Missing courseId or moduleId for navigation")
      return
    }
  
    console.log("Navigating to module:", moduleId, "in course:", courseId)
    navigation.navigate("ModuleDetail", { courseId, moduleId })
  }
  
  /**
   * Navigate to the AI Tutor screen
   * @param {object} navigation - The navigation object
   * @param {object} params - Optional parameters to pass to the AI Tutor screen
   */
  export const navigateToAITutor = (navigation, params = {}) => {
    console.log("Navigating to AI Tutor")
    navigation.navigate("AITutor", params)
  }
  
  