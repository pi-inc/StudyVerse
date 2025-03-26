import type React from "react"
import { Feather } from "@expo/vector-icons"

interface IconProps {
  color: string
  size?: number
}

const CoursesIcon: React.FC<IconProps> = ({ color, size = 24 }) => {
  return <Feather name="book" size={size} color={color} />
}

export default CoursesIcon

