// Navigation utility functions

export const navigateToCourse = (navigation, courseId) => {
  if (!navigation) {
    console.error("Navigation object is undefined")
    return
  }

  navigation.navigate("CourseDetail", { courseId })
}

export const navigateToAITutor = (navigation) => {
  if (!navigation) {
    console.error("Navigation object is undefined")
    return
  }

  navigation.navigate("AITutor")
}

export const navigateToLearn = (navigation) => {
  if (!navigation) {
    console.error("Navigation object is undefined")
    return
  }

  navigation.navigate("Learn")
}

export const navigateToPlan = (navigation) => {
  if (!navigation) {
    console.error("Navigation object is undefined")
    return
  }

  navigation.navigate("Plan")
}

