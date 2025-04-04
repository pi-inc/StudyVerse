import { auth } from "./firebase"
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth"

// Listen for authentication state changes
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

// Sign out the current user
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

// Send email verification to current user
export const sendVerificationEmail = async () => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("No authenticated user found")

    await sendEmailVerification(user)
    return true
  } catch (error) {
    console.error("Email verification error:", error)
    throw error
  }
}

// Update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("No authenticated user found")
    if (!user.email) throw new Error("User has no email")

    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Update password
    await updatePassword(user, newPassword)
    return true
  } catch (error) {
    console.error("Password update error:", error)
    throw error
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser
}

