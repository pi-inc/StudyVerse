import type React from "react"
import { Feather } from "@expo/vector-icons"

interface IconProps {
  color: string
  size?: number
}

const SocialIcon: React.FC<IconProps> = ({ color, size = 24 }) => {
  return <Feather name="users" size={size} color={color} />
}

export default SocialIcon

