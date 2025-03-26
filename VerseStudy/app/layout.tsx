import type React from "react"
import ClientLayout from "./clientLayout"

export const metadata = {
  title: "StudyVerse",
  description: "Your personalized learning platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

