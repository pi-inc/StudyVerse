import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { FIREBASE_CONFIG, isFirebaseConfigValid } from "../config/env"

// Initialize Firebase
let app
let auth
let firestore
let storage

try {
  if (isFirebaseConfigValid()) {
    if (getApps().length === 0) {
      app = initializeApp(FIREBASE_CONFIG)
    } else {
      app = getApp()
    }

    auth = getAuth(app)
    firestore = getFirestore(app)
    storage = getStorage(app)

    console.log("Firebase initialized successfully")
  } else {
    console.warn("Firebase configuration is incomplete. Some features may not work.")
  }
} catch (error) {
  console.error("Error initializing Firebase:", error)
}

export { app, auth, firestore, storage }


