import type React from "react"
import { Feather } from "@expo/vector-icons"

interface IconProps {
  color: string
  size?: number
}

const HomeIcon: React.FC<IconProps> = ({ color, size = 24 }) => {
  return <Feather name="home" size={size} color={color} />
}

export default HomeIcon

