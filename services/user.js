import { auth, firestore } from "./firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"

export const createUserProfile = async (userData) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("No authenticated user found")

    const userRef = doc(firestore, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      // Create new user document
      await setDoc(userRef, {
        email: user.email,
        displayName: userData.displayName || user.displayName || "",
        studyGoal: userData.studyGoal || "",
        learningStyle: userData.learningStyle || "",
        studyTimeMinutes: userData.studyTimeMinutes || 30,
        subjects: userData.subjects || [],
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      })

      console.log("User profile created successfully")
      return true
    } else {
      // Update existing user document
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        // Update other fields if needed
        ...(userData.displayName && { displayName: userData.displayName }),
        ...(userData.studyGoal && { studyGoal: userData.studyGoal }),
        ...(userData.learningStyle && { learningStyle: userData.learningStyle }),
        ...(userData.studyTimeMinutes && { studyTimeMinutes: userData.studyTimeMinutes }),
        ...(userData.subjects && { subjects: userData.subjects }),
      })

      console.log("User profile updated successfully")
      return true
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error)
    throw error
  }
}

export const getUserProfile = async () => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("No authenticated user found")

    const userRef = doc(firestore, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() }
    } else {
      console.warn("No user profile found")
      return null
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

