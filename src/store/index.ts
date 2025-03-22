import { create } from "zustand"

interface CourseRequest {
  courseName: string
  topicDescription: string
  learningGoals: string
  learningStyle: string
}

interface AppState {
  isLoading: boolean
  isDarkMode: boolean
  user: null | { id: string; name: string; email: string }
  toggleDarkMode: () => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  requestCustomCourse: (request: CourseRequest) => Promise<void>
}

export const useStore = create<AppState>((set) => ({
  isLoading: false,
  isDarkMode: false,
  user: null,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setLoading: (loading) => set({ isLoading: loading }),

  login: async (email, password) => {
    set({ isLoading: true })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({
        user: { id: "1", name: "Test User", email },
        isLoading: false,
      })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({
        user: { id: "1", name, email },
        isLoading: false,
      })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    set({ user: null })
  },

  requestCustomCourse: async (request) => {
    set({ isLoading: true })
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({ isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
}))

